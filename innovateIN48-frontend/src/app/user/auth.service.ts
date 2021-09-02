import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_URL } from "../env";
import { AppUser } from "./user.model";

@Injectable()

export class AuthService {
    constructor(private http: HttpClient) { }

    private static _handleError(err: HttpErrorResponse | any) {
        return Observable.throw(err.message || 'Error: Unable to complete request.')        
    }

    loginUser(userName: string, password: string): Observable<AppUser[]> {
        return this.http
        .get(`${API_URL}/login`)
        .catchError(this._handleError)

    }
}