import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public imgAlex;
  
  selectedFile: File = null;
  
  constructor(private http: HttpClient) {}
  
  onFileChanged(event) {
    var url = "https://us-central1-endless-upgrade-223916.cloudfunctions.net/where-is-alex";

    this.imgAlex = getAsDataURL(this.selectedFile);
    this.http.post(url, r.result).subscribe(event => {
      console.log(event); // handle event here
      getElementById('result').append(event[0].payload[0].displayName);
    });
  }
  
}
