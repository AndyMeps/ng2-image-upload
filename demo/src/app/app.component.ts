import { Component } from '@angular/core';

import { IImageUploadConfiguration, ImageUpload } from 'ng2-image-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public imageUploadConfig: IImageUploadConfiguration;

  constructor() {
    this.imageUploadConfig = {
      addSectionHeader: "Custom addSectionHeader",
      uploadedHeader: "Custom uploadedHeader",
      buttonLabel: "Custom buttonLabel"//,
      //accepts: [".gif"]
    };
  }

  public imageUploadChanged = (value: ImageUpload[]) => {
    console.log(value);
  }
}
