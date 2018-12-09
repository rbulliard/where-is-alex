import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public showLoader = false;
  
  selectedFile: File = null;
  
  constructor(private http: HttpClient) {}
  
  onFileChanged(event) {
    this.selectedFile = <File>event.target.files[0];
    
    var preview = document.querySelector("img");
    var result = document.querySelector("#result");//document.getElementById('result');
    if (result != null) {
      result.remove();
    }
    this.showLoader = true;
    var app = this;
    
    
    var httpClient = this.http;

    var reader  = new FileReader();
    reader.addEventListener("load", function () {
      preview.src = reader.result.toString();
      
      var url = "https://us-central1-endless-upgrade-223916.cloudfunctions.net/where-is-alex";
      httpClient.post(url, reader.result).subscribe(event => {
        console.log(event); // handle event here
        var response = document.createElement("div");
        response.id = "result";
        response.innerText = event[0].payload[0].displayName;
        app.showLoader = false;
        document.querySelector(".result").append(response);
      });
    }, false);

    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
}
