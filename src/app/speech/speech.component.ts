import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpeechService } from './speech-service';


@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.less']
})
export class SpeechComponent implements OnInit {
  speechText=""
  speechUrl = " http://127.0.0.1:5000/speech";

  constructor(private http: HttpClient,
    private speechService: SpeechService) { 
  }

  data = {"sender": "test" , "message" : "feel cold"};
  ngOnInit(): void {
    
  }

  startListing(){
    this.speechService.record().subscribe((res)=>{
      console.log(res);
      this.speechText = res;
      this.data.message = res;
      this.speak(this.speechText);
      this.http.post('https://hopebot.azurewebsites.net/webhooks/rest/webhook',this.data)
      .subscribe((res)=>{
        console.log(res);
        this.speechText = res[0].text;
        this.speak(this.speechText)
      })
    },error=>{
      console.log(error);
      this.speechService.DestroySpeechObject();
    })
  }

  stop(){
    this.speechService.DestroySpeechObject();
  }

  speak(text){
    if ('speechSynthesis' in window) {

      var synthesis = window.speechSynthesis;
    
      // Get the first `en` language voice in the list
      var voice = synthesis.getVoices().filter(function(voice) {
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
