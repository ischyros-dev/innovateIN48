import { Injectable } from "@angular/core";

declare var webkitSpeechRecognition: any

@Injectable()

export class VoiceRecoginitionService {
    recognition = new webkitSpeechRecognition()
    isStoppedSpeechRecog = false
    public text = ''
    tempWords = ''

    constructor() { }

    init() {
        this.recognition.interimResults = true
        this.recognition.lang = 'en-US'

        this.recognition.addEventListener('result', (e) => {
            const transcript = Array.from(e.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('')
            this.tempWords = transcript
            console.log(transcript)
        })
    }

    wordConcat() {
        this.text = this.text + this.tempWords
        this.tempWords = ''
    }

    start() {
        this.isStoppedSpeechRecog = false
        this.recognition.start()
        console.log("Speech recognition started")
        this.recognition.addEventListener('end', (condition) => {
            if(this.isStoppedSpeechRecog) {
                this.recognition.stop()
                console.log("Speech recognition ended")
            }
            else {
                this.wordConcat()
                this.recognition.start()
            }
        })
    }

    stop() {
        this.isStoppedSpeechRecog = true
        this.wordConcat()
        this.recognition.stop()
        console.log("Speech recognition ended")
    }

}