import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, merge, of } from "rxjs";
import { map, tap, debounceTime, takeUntil, delay, share } from "rxjs/operators";
import { SenseService } from "../shared/sense.service";
import { AuthService } from "./auth.service";
import { RecognizedTextAction, SpeakingStarted, ListeningStarted } from "../class/models";

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class UserLoginComponent implements OnInit {
    userName
    password
    mouseoverLogin
    loginInvalid = false
    user$: Observable<any>
    text: any

    destroy$ = new Subject()

    recognized$ = this.senseService.getType(RecognizedTextAction)
    state$: Observable<string>
    message$: Observable<string>

    micAccess$ = this.senseService.hasMicAccess$

    constructor(
        public authService: AuthService,
        private router: Router,
        public senseService: SenseService
    ) {
        this.message$ = this.recognized$.pipe(tap())

            const speaking$ = this.senseService
                .getType(SpeakingStarted)
                .pipe(map(() => 'SPEAKING'))

            const listening$ = this.senseService
                .getType(ListeningStarted)
                .pipe(map(() => 'LISTENING'))
            
            this.state$ = merge(speaking$, listening$)

            this.recognized$.pipe(
                debounceTime(200),
                tap((msg) => {
                    // msg = `you said ${msg}`
                    this.senseService.speak('Your username is' + msg)
                    }, takeUntil(this.destroy$))
                )
                .subscribe()
    }

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
                console.log('Login successful.')                
            }
        })
    }

    getAsyncData() {
        return of({
            userName: this.message$
        }).pipe(delay(100))
    }

    ngOnInit() {
        this.user$ = this.getAsyncData().pipe(share())
    }

    cancel() {
        
    }

}