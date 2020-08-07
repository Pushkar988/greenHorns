import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from "lodash";

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class SpeechService {
    speechRecognition: any;
    constructor(private zone: NgZone) {
    }

    record(): Observable<string> {

        return Observable.create(observer => {
            //const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition =  new (<any>window).webkitSpeechRecognition();
            //this.speechRecognition = SpeechRecognition;
            this.speechRecognition.continuous = true;
            this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;

            this.speechRecognition.onresult = speech => {
                let term: string = "";
                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            console.log("Unrecognized result - Please try again");
                        }
                        else {
                            term = _.trim(transcript);
                            console.log("Did you said? -> " + term + " , If not then say something else...");
                        }
                    }
                }
                this.zone.run(() => {
                    observer.next(term);
                });
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
                this.speechRecognition.start();
            };

            this.speechRecognition.start();
            console.log("Say something - We are listening !!!");
        });
    }

    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    }

    StartAgain() {
        if (this.speechRecognition)
            this.speechRecognition.start();
    }

    speak(text):Observable<any>{
        return Observable.create(obserber=>{
            var recognition = new (<any>window).webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onresult = function (e) {
                for (var i = e.resultIndex; i< e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        text.value += e.results[i][0].transcript;
                    }
                }
            }
            // start listening
            recognition.start();
        })
    }
}