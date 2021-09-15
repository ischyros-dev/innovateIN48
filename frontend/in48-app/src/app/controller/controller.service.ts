import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AppUser } from "../model/user.model";
import { Transaction } from "../model/transaction.model";
import { 
    API_CREATE, 
    API_DEPOSIT, 
    API_HOME,
    API_INQUIRE,
    API_TRANSFER, 
    API_WITHDRAW} 
from "../env";

@Injectable()

export class ControllerService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    newUser: AppUser
    usersubject = new BehaviorSubject<any>(null)
    errorSubject = new BehaviorSubject<any>(null)
    user = this.usersubject.asObservable()
    errorMessage = this.errorSubject.asObservable()
    createAccount(newUser) {
            let customerInfo = {
                cust_id: newUser.userName,
                acct_no: newUser.accountNumber,
                password: newUser.password,
                first_name: newUser.firstName,
                last_name: newUser.lastName
            }
            let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

            return this.http.post<AppUser>(`${API_CREATE}`, customerInfo, options)
            .pipe(tap((res: any) => {
                if (res && res.jwt) {
                    sessionStorage.setItem('jwt', res.jwt)
                    this.errorSubject.next(null)
                    if (res.data) {
                      this.usersubject.next(res.data)
                      sessionStorage.setItem('api_key', res.data.ID)
                    }
                    this.router.navigateByUrl('')
                  } else if (res.Message) {
                    this.errorSubject.next(res.Message)
                  }
            }))
            .pipe(catchError(this.handleError<AppUser>('createAccount')))
    }

    balanceInquiry(): Observable<any> {
        return this.http.get<any>(`${API_INQUIRE}`)
    }

    transferTransaction: Transaction
    transfer(transferTransaction) {
        let transferInfo = {
            from_acct_no: transferTransaction.accountNumber,
            amount: transferTransaction.amount
        }
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

        return this.http.post<Transaction>(`${API_TRANSFER}`, transferInfo, options)
        .pipe(catchError(this.handleError<Transaction>('transfer')))
    }

    depositTransaction: Transaction
    deposit(depositTransaction) {
        let depositInfo = {
            cust_no: depositTransaction.userName,
            acct_no: depositTransaction.accountNumber,
            amount: depositTransaction.amount
        }
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

        return this.http.post<Transaction>(`${API_DEPOSIT}`, depositInfo, options)
        .pipe(catchError(this.handleError<Transaction>('deposit')))

    }

    withdrawalTransaction: Transaction
    withdraw(withdrawalTransaction) {
        let withdrawalInfo = {
            acct_no: withdrawalTransaction.accountNumber,
            amount: withdrawalTransaction.amount
        }
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

        return this.http.post<Transaction>(`${API_WITHDRAW}`, withdrawalInfo, options)
        .pipe(catchError(this.handleError<Transaction>('withdraw')))

    }

    goToDashboard(): Observable<any> {
        return this.http.get<any>(`${API_HOME}`)
        .pipe(catchError(this.handleError<any>()))
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error)
            return Observable.throw(result as T)
        }
    }

}