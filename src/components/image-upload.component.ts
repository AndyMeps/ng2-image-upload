import { Component } from '@angular/core';

import { ImageUpload } from '../models';

@Component({
    selector: `image-upload`,
    template: `<p>I am image-upload!</p>`,
    styles: [``]
})
export class ImageUploadComponent {

    public images: ImageUpload[];

    private fileReader: FileReader;
    private currentFile: File;

    constructor() {
        this.images = [];

        this.fileReader = new FileReader();

        this.fileReader.addEventListener('load', () => {
            let data = this.fileReader.result;

            let img = new ImageUpload(data, this.currentFile.name, this.currentFile.size);

            this.images.push(img);
        });
    }

    public upload(files: File[]) {
        this.currentFile = files[0];
        this.fileReader.readAsDataURL(this.currentFile);
    }

    public removeImage(index: number) {
        this.images.splice(index, 1);
    }

}
