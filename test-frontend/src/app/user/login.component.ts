import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class UserLoginComponent implements OnInit {
    userName
    password
    loginInvalid = false

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    login(formValues) {
        this.authService.loginUser(
            formValues.userName,
            formValues.password
        )
        .subscribe(resp => {
            if(!resp) {
                this.loginInvalid = true
                console.log('Invalid login credentials.')
            }
            else {
                console.log('Login successful.')                
            }
        })
    }

    ngOnInit() {

    }

    cancel() {
        
    }

}