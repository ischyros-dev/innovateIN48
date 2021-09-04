import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppUser } from "./user.model";
import { API_URL } from "../env";
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()

export class AuthService {
    constructor(private http: HttpClient) { }

    currentUser: AppUser
    loginUser(userName: string, password: string) {
        let loginInfo = { username: userName, password: password }
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

        return this.http.post(`${API_URL}/login`, loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <AppUser>data['user']
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
    }
    
}