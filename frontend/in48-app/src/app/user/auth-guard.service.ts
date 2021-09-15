import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { API_URL } from "../env";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    
  constructor(
  private router: Router,
  private http: HttpClient,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any {
    const userName = localStorage.getItem('cust_no')
    
    if (userName) {
      return this.http.get(`${API_URL}user/${userName}`)
      .pipe(map(res => {
          if (res['data']['ID'] === String(userName)) {
            return true;
          } else {
            this.router.navigateByUrl('login');
            return false;
          }
        }),
        catchError((err) => {
          return of(false);
        })
      )
    }
    else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

}