import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private http: HttpClient) {}
  
  onFileChanged(event) {
    var urlModel = "https://automl.googleapis.com/v1beta1/projects/endless-upgrade-223916/locations/us-central1/models/ICN5541762132522833103";
    this.http.post(
      urlModel, 
      {
        payload: {
         image: {
           imageBytes: event.target.files[0]
          }
        }
      }, 
      {
       headers: { 'Content-Type': 'application/json' }
      }).subscribe(event => {
        console.log(event); // handle event here
      });
  }
  
}
