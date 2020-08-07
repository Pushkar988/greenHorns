import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { SpeechService } from '@app/speech/speech-service';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;
    start=false;
    constructor(private accountService: AccountService,private http: HttpClient,
        private speechService: SpeechService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }

    speechText = "";
    speechUrl = " http://127.0.0.1:5000/speech";
    data = { "sender": "", "message": "" };
    ngOnInit(): void {

    }


    startListing() {
        return new Promise((resolve,reject)=>{
            this.speechService.record().subscribe((res)=>{
              if(!res){
                  console.log("No Response...",res);
                  return;
              }  
              console.log(res);
              this.speechText = res;
              this.data.message = res;
              this.http.post('https://hopebot.azurewebsites.net/webhooks/rest/webhook',this.data)
              .subscribe((res:any)=>{
                console.log(res);
                res.forEach((element)=>{
                    this.speak(element.text);
                })
                
              })
            },error=>{
              console.log(error);
              this.speechService.DestroySpeechObject();
              //this.speechService.StartAgain();
            })
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
            utterance.pitch = 1.0;
            utterance.rate = .70;
            utterance.volume = 1.0;

            // Speak the utterance
            synthesis.speak(utterance);

        } else {
            console.log('Text-to-speech not supported.');
        }
    }
}