import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerService } from '../controller/controller.service';
import { SpeechSenseService } from '../shared/speech-sense.service';
import { Observable, Subject, merge } from "rxjs";
import { map, tap, debounceTime, takeUntil } from "rxjs/operators";
import { RecognizedTextAction, SpeakingStarted, ListeningStarted } from "../model/speech.models";
// import { VoiceRecoginitionService } from '../shared/voice-recognition.service';
import { Transaction } from '../model/transaction.model';
import { SpeechSynthesisModule, SpeechRecognitionService, skipUntilSaid, takeUntilSaid } from '@ng-web-apis/speech';


@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})

export class DepositComponent {
  public depositTrans: Transaction
  userName: Transaction
  // accountNumber: Transaction
  // amount: Transaction

  // isListen = 'N'
  // text: string

  speechRecognition$

  destroy$ = new Subject()

  recognized$ = this.speechSense.getType(RecognizedTextAction)
  recognized2$ = this.speechSense.getType(RecognizedTextAction)
  recognized3$ = this.speechSense.getType(RecognizedTextAction)

  state$: Observable<string>
  message$: Observable<any>

  message2$: Observable<any>
  message3$: Observable<any>

  micAccess$ = this.speechSense.hasMicAccess$

  constructor(
    private router: Router,
    private conServ: ControllerService,
    private speechSense: SpeechSenseService
    // public voiceRecogService: VoiceRecoginitionService
  ) {
      // this.message$ = this.recognized$.pipe(tap())
      // const speaking$ = this.speechSense
      //   .getType(SpeakingStarted)
      //   .pipe(map(() => 'SPEAKING'))

      // const listening$ = this.speechSense
      //     .getType(ListeningStarted)
      //     .pipe(map(() => 'LISTENING'))
            
      // this.state$ = merge(speaking$, listening$)

      // this.recognized$.pipe(
      //   debounceTime(200),
      //   tap((msg) => {
      //     this.speechSense.speak('Input value is' + msg)
      //     }, takeUntil(this.destroy$)))
      //     .subscribe()

  }
  
  inputValue1() {
    this.message$ = this.recognized$.pipe(tap())
    this.recognized$.pipe(
      debounceTime(200),
      tap((msg) => {
        this.speechSense.speak('Input value is' + msg)
      }, takeUntilSaid('Done')
    ))
    .subscribe()
  }

  inputValue2() {
    this.message2$ = this.recognized2$.pipe(tap())
    this.recognized$.pipe(
      debounceTime(100),
      tap((msg) => {
        this.speechSense.speak('Input value is' + msg)
      }, takeUntilSaid('Done')
    ))
    .subscribe()
  }

  inputValue3() {
    this.message3$ = this.recognized3$.pipe(tap(
      skipUntilSaid('Username')
    ))
    this.recognized$.pipe(
      debounceTime(100),
      tap((msg) => {
        this.speechSense.speak('Input value is' + msg)
      }, takeUntilSaid('Done')
    ))
    .subscribe()
  }
  
    

  deposit(formValues) {
    this.conServ.deposit(formValues).subscribe(() => {
      this.router.navigate(['/dashboard'])
    })
  }

  cancel() {
    this.router.navigate(['/dashboard'])
  }




  // startSpeechRecog() {
    //     this.voiceRecogService.start()
    // }

    // stopSpeechRecog() {
    //     this.voiceRecogService.stop()
    // }

    // setListen(isListening) {
    //     this.isListen = isListening
    //     if(this.isListen === 'Y') {
    //         this.voiceRecogService.start()
    //     }
    //     else {
    //         this.voiceRecogService.text = ''
    //         this.voiceRecogService.stop()
    //     }
    // }

}


