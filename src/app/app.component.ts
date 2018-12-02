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
    console.log(event.target.files[0]);
    var config = {
        headers: {'Content-Type': undefined},
        transformRequest: []
    };
    //var urlModel = "https://automl.googleapis.com/v1beta1/projects/endless-upgrade-223916/locations/us-central1/models/ICN5541762132522833103:predict";
    var url = "https://us-central1-endless-upgrade-223916.cloudfunctions.net/where-is-alex";
    this.http.post(url, event.target.files[0], config).subscribe(event => {
        console.log(event); // handle event here
      });
  }
  
}
