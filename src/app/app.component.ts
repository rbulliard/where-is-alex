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
    this.selectedFile = <File>event.target.files[0];
    
    var preview = document.querySelector("img");
    var result = document.querySelector("#result");//document.getElementById('result');
    var loader = document.querySelector(".lds-facebook");
    result.remove();
    loader.show();
    
    var httpClient = this.http;

    var reader  = new FileReader();
    reader.addEventListener("load", function () {
      preview.src = reader.result.toString();
      
      var url = "https://us-central1-endless-upgrade-223916.cloudfunctions.net/where-is-alex";
      httpClient.post(url, reader.result).subscribe(event => {
        console.log(event); // handle event here
        var response = document.createElement("div");
        response.setId("result");
        response.setText(event[0].payload[0].displayName);
        loader.hide();
        loader.append(response);
      });
    }, false);

    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
}
