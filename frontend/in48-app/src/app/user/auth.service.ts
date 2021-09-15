import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppUser } from "../model/user.model";
import { API_URL } from "../env";
import { API_AUTHSESSION } from "../env";
import { catchError, tap } from "rxjs/operators";
import { throwError, of } from "rxjs";


@Injectable()

export class AuthService {
    constructor(
        private router: Router,
        private http: HttpClient) { }

    currentUser: AppUser
    loginUser(userName: string, password: string) {
        let loginInfo = { cust_id: userName, password: password }
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
        
        return this.http.post(`${API_AUTHSESSION}`, loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <AppUser>data['user']
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }    

    isAuthenticated() {
        return !!this.currentUser
    }

    checkAuthenticationStatus() {
        return this.http.get(`${API_URL}/`)
        .pipe(tap(data => {
            if(data instanceof Object) {
                this.currentUser = <AppUser>data['user']
            }
        }))
        .subscribe()
    }

    handleError(error: HttpErrorResponse) {
        let msg = ''
        if (error.error instanceof ErrorEvent) {
          // client-side error
          msg = error.error.message
        } else {
          // server-side error
          msg = `Error Code: ${error.status}\nMessage: ${error.message}`
        }
        return throwError(msg);
      }

    
}