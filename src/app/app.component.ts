import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public showLoader = false;
  
  public succes = true;
  
  selectedFile: File = null;
  
  constructor(private http: HttpClient) {}
  
  onFileChanged(event) {
    var app = this;
    this.selectedFile = <File>event.target.files[0];
    this.showLoader = true; 

    var reader  = new FileReader();
    reader.addEventListener("load", function () {
      document.querySelector("img").src = reader.result.toString();
      
      var url = "https://us-central1-endless-upgrade-223916.cloudfunctions.net/where-is-alex";
      app.http.post(url, reader.result).subscribe(event => {
        console.log(event); // handle event here
        app.showLoader = false;
        app.succes = ("alex" == event[0].payload[0].displayName);
      });
    }, false);

    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
}
