import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpeechService } from './speech-service';


@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.less']
})
export class SpeechComponent {
  // speechText:any;
  
  // constructor(private http: HttpClient,
  //   private speechService: SpeechService) { 
  // }
  // data = {"sender": "test" , "message" : "sad"};
  // ngOnInit(): void {
  //   this.http.post('https://hopebot.azurewebsites.net/webhooks/rest/webhook',this.data).subscribe((res)=>{
  //     console.log(res);
  //   })
  // }

  // startListing(){
  //   this.speechService.record().subscribe((res)=>{
  //     console.log(res);
  //     this.speechText = res;
  //   },error=>{
  //     console.log(error);
  //     this.speechService.DestroySpeechObject();
  //   })
  // }

  // stop(){
  //    this.speechService.DestroySpeechObject();
  // }
  

}
