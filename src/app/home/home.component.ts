import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
     templateUrl: 'home.component.html',
     styleUrls: ['./home.component.less'] })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
    takeCare = "Throughout your pregnancy, your health care provider will check your weight and blood pressure while also checking the growth and development of your baby (by doing things like feeling your abdomen, listening for the fetal heartbeat starting during the second trimester, and measuring your belly). During the span of your pregnancy, you'll also have prenatal tests, including blood, urine, and cervical tests, and probably at least one ultrasound.";
    speak(){
        if ('speechSynthesis' in window) {

            var synthesis = window.speechSynthesis;

            // Get the first `en` language voice in the list
            var voice = synthesis.getVoices().filter(function (voice) {
                return voice.lang === 'en';
            })[0];

            // Create an utterance object
            var utterance = new SpeechSynthesisUtterance(this.takeCare);

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