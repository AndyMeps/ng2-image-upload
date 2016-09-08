import { Component } from '@angular/core';

import { IImageUploadConfiguration } from 'ng2-imageupload';

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
      buttonLabel: "Custom buttonLabel"
    };
  }
}
