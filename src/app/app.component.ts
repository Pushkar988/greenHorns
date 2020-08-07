import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { SpeechService } from '@app/speech/speech-service';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService,private http: HttpClient,
        private speechService: SpeechService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }

    speechText = ""
    speechUrl = " http://127.0.0.1:5000/speech";



    data = { "sender": "", "message": "" };
    ngOnInit(): void {

    }

    startListing() {
        this.speechService.record().subscribe((res) => {
            console.log(res);
            this.speechText = res;
            this.data.message = res;
            console.log( this.data.message);
            this.speak(this.speechText);
            this.http.post('https://hopebot.azurewebsites.net/webhooks/rest/webhook', this.data)
                .subscribe((res) => {
                    console.log(res);
                    this.speechText = res[0].text;
                    this.speak(this.speechText)
                })
        }, error => {
            console.log(error);
            this.speechService.DestroySpeechObject();
        })
    }

    stop() {
        this.speechService.DestroySpeechObject();
    }

    speak(text) {
        if ('speechSynthesis' in window) {

            var synthesis = window.speechSynthesis;

            // Get the first `en` language voice in the list
            var voice = synthesis.getVoices().filter(function (voice) {
                return voice.lang === 'en';
            })[0];

            // Create an utterance object
            var utterance = new SpeechSynthesisUtterance(text);

            // Set utterance properties
            utterance.voice = voice;
            utterance.pitch = 2.0;
            utterance.rate = 1.25;
            utterance.volume = 1.0;

            // Speak the utterance
            synthesis.speak(utterance);

        } else {
            console.log('Text-to-speech not supported.');
        }
    }
}