import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  selectedFile: File = null;
  
  constructor(private http: HttpClient) {}
  
  onFileChanged(event) {
    console.log(event.target.files[0]);
    
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    var config = {
        headers: {'Content-Type': "image/jpeg"},
        transformRequest: []
    };
    //var urlModel = "https://automl.googleapis.com/v1beta1/projects/endless-upgrade-223916/locations/us-central1/models/ICN5541762132522833103:predict";
    var url = "https://us-central1-endless-upgrade-223916.cloudfunctions.net/where-is-alex";
    //this.http.post(url, fd).subscribe(event => {
    //    console.log(event); // handle event here
    //  });
    var httpClient = this.http;
    var r = new FileReader();
    r.onload = function(){ 
      console.log(btoa(r.result));
      httpClient.post(url, btoa(r.result)).subscribe(event => {
        console.log(event); // handle event here
      });
    };
    r.readAsBinaryString(this.selectedFile);
  }
  
}
