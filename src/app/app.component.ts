import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'where-is-alex';
  
  onFileChanged(event) {
    const file = event.target.files[0];
    this.http.post('my-backend.com/file-upload', this.selectedFile).subscribe(event => {
      console.log(event); // handle event here
    });
  }
  
}
