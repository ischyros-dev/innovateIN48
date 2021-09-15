import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    userName
    password
    mouseoverLogin
    loginInvalid = false
    
    constructor(
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    login(formValues) {
        this.authService.loginUser(
            formValues.userName,
            formValues.password
        )
        .subscribe(resp => {
            if(!resp) {
                this.loginInvalid = true
                console.log('Login failed.')
            }
            else {
                this.router.navigate(['dashboard'])
                console.log('Login successful.')
            }
        })
    }

    ngOnInit() {
        
    }

}