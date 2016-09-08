import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { ImageUpload, ImageUploadConfiguration, IImageUploadConfiguration } from '../models';

@Component({
    selector: `image-upload`,
    template: `
        <div class="row images-detail">
            <div class="col-xs-12">

            <h4 *ngIf="images.length > 0">{{config.uploadedHeader}}</h4>

            <div class="upload-container">
                <div class="upload-item" *ngFor="let image of images; let i = index;" (click)="removeImage(i)">
                <img  [src]="image.data" style="max-height: 100px; max-width: 100px;" />
                <p class="upload-title">{{image.fileName}}</p>
                <p class="upload-file-size">{{image.size | fileSize:1}}</p>
                </div>
            </div>

            <h4>{{config.addSectionHeader}}</h4>
            <input type="file" #fileUpload style="display: none;" accept="image/*" (change)="upload(fileUpload.files)"/>
            <button class="btn btn-bordered" (click)="fileUpload.click()"><i class="fa fa-plus"></i> {{config.buttonLabel}}</button>
            <p><small>Accepted formats: JPG, PNG and GIF</small></p>
            </div>
        </div>
    `,
    styles: [
        `.upload-container {
            display: flex; }`,

        `.upload-item {
            display: inline-block;
            max-width: 120px;
            text-align: center; }`,

        `.upload-item + .upload-item {
            margin-left: 2rem; }`,

        `.upload-title {
            margin-top: 1rem;
            word-wrap: break-word; }`,

        `.upload-file-size {
            font-weight: bold; }`
    ]
})
export class ImageUploadComponent implements OnInit {

    @Input('upload-config') opts: IImageUploadConfiguration;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    public images: ImageUpload[];

    public config: ImageUploadConfiguration;

    private fileReader: FileReader;
    private currentFile: File;

    constructor() {
        this.config = new ImageUploadConfiguration();

        this.images = [];

        this.fileReader = new FileReader();

        this.fileReader.addEventListener('load', this._fileReaderLoad);
    }

    ngOnInit() {
        this._processOptions();
    }

    public upload(files: File[]) {
        if (files != null) {
            this.currentFile = files[0];
            this.fileReader.readAsDataURL(this.currentFile);

            files = null;
        }
    }

    public removeImage(index: number) {
        this.images.splice(index, 1);
    }

    private _processOptions() {
        if(this.opts != null) {
            // addSectionHeader
            if (this.opts.addSectionHeader != null) {
                this.config.addSectionHeader = this.opts.addSectionHeader;
            }

            // uploadedHeader
            if (this.opts.uploadedHeader != null) {
                this.config.uploadedHeader = this.opts.uploadedHeader;
            }

            // buttonLabel
            if (this.opts.buttonLabel != null) {
                this.config.buttonLabel = this.opts.buttonLabel;
            }
        }
    }

    private _onChange() {
        this.onChange.emit(this.images);
    }

    private _fileReaderLoad = () => {
        let data = this.fileReader.result;

        let img = new ImageUpload(data, this.currentFile.name, this.currentFile.size);

        this.images.push(img);

        this._onChange();
    }

}
