import { Component, Input, Output, EventEmitter, OnInit, Self } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

import { ImageUpload, ImageUploadConfiguration, IImageUploadConfiguration, Error } from '../models';
import { ErrorType } from '../enums';

const BYTES_IN_ONE_MB = 1048576;

/**
 * Image upload component to be referenced in component markup
 *
 * @export
 * @class ImageUploadComponent
 * @implements {OnInit}
 */
@Component({
    selector: `image-upload[ngModel]`,
    template: `
        <div class="row images-detail">
            <div class="col-xs-12">

            <h4 *ngIf="cd.viewModel.length > 0">{{config.uploadedHeader}}</h4>

            <div class="upload-container">
                <div class="upload-item" *ngFor="let image of cd.viewModel; let i = index;">
                    <div class="image-area">
                        <div class="upload-item-overlay">
                            <span class="remove-upload" (click)="removeImage(i)">×</span>
                        </div>
                        <img [src]="image.data" style="max-height: 100px; max-width: 100px;" />
                    </div>

                    <p class="upload-title">{{image.fileName}}</p>
                    <p class="upload-file-size">{{image.size | fileSize:1}}</p>
                </div>
            </div>

            <h4>{{config.addSectionHeader}}</h4>
            <input type="file" #fileUpload style="display: none;" [accept]="config.accepts" (change)="upload(fileUpload.files, fileUpload)" />
            <button class="btn btn-bordered" (click)="fileUpload.click();"><i class="fa fa-plus"></i> {{config.buttonLabel}}</button>
            <p *ngIf="config.accepts.indexOf('image/*') === -1"><small>Accepted image formats: {{config.accepts}}</small></p>
            <p>{{totalUploadedSize | fileSize:1}}</p>
            </div>
        </div>
    `,
    styles: [
        `.upload-container {
            display: flex; }`,

        `.upload-item {
            position: relative;
            display: inline-block;
            max-width: 120px;
            text-align: center; }`,

        `.upload-item + .upload-item {
            margin-left: 2rem; }`,

        `.upload-title {
            margin-top: 1rem;
            word-wrap: break-word; }`,

        `.upload-file-size {
            font-weight: bold; }`,

        `.image-area {
            min-height: 35px;
            position: relative; }`,

        `.image-area > .upload-item-overlay {
            display: none; }`,

        `.image-area:hover > .upload-item-overlay {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
            text-align: right;
            z-index: 2; }`,

        `.remove-upload {
            font-size: 25px;
            margin-right: 8px;
            color: #ff0000;
            cursor: pointer; }`
    ],
    providers: [ NgModel ]
})
export class ImageUploadComponent implements ControlValueAccessor, OnInit {

    /**
     * Configuration object to customize ImageUploadComponent, mapped to ImageUploadComponent.config
     *
     * @type {IImageUploadConfiguration}
     */
    @Input('upload-config') opts: IImageUploadConfiguration;

    /**
     * OnChange event emitter, returns the removed single image.
     *
     * @type {EventEmitter<any>}
     */
    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    /**
     * OnAdd event emitter, returns the added single image.
     *
     * @type {EventEmitter<any>}
     */
    @Output() onAdd: EventEmitter<any> = new EventEmitter();

    /**
     * OnError event emitter, returns an error message.
     *
     * @type {EventEmitter<any>}
     * @memberOf ImageUploadComponent
     */
    @Output() onError: EventEmitter<any> = new EventEmitter();

    // -----------------------------------------------------------------

    public cd: NgModel;

    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    /**
     * Configuration object to customize ImageUploadComponent
     *
     * @type {ImageUploadConfiguration}
     */
    public config: ImageUploadConfiguration;

    // -----------------------------------------------------------------

    /**
     * Receives the File object and interprets
     *
     * @private
     * @type {FileReader}
     */
    private fileReader: FileReader;

    /**
     * Currently selected file object.
     *
     * @private
     * @type {File}
     */
    private currentFile: File;

    private files: ImageUpload[];

    // -----------------------------------------------------------------

    /**
     * Creates an instance of ImageUploadComponent.
     *
     */
    constructor(@Self() cd: NgModel) {
        this.cd = cd;
        cd.valueAccessor = this;

        this.files = [];
        this.config = new ImageUploadConfiguration();

        this.fileReader = new FileReader();

        this.fileReader.addEventListener('load', this._fileReaderLoad);
    }

    /**
     * Angular2 lifecycle event, triggered after constructor()
     */
    ngOnInit() {
        this._processOptions();
    }

    get totalUploadedSize() {
        let total = 0;

        for (let i = 0; i < this.files.length; i++) {
            total += this.files[i].size;
        }
        return total;
    }

    // -----------------------------------------------------------------

    public writeValue(value: any): void {

    }

    /**
     * Upload file array
     *
     * @param {File[]} files
     */
    public upload(files: File[], elem: HTMLInputElement) {
        let filesLength = files.length;

        if (filesLength > 0) {
            for (let i = 0; i < filesLength; i++) {
                this.currentFile = files[i];
                this.fileReader.readAsDataURL(this.currentFile);
            }
        }

        elem.value = '';
    }

    /**
     * Remove an image at index from ImageUploadComponent.images.
     *
     * @param {number} index
     */
    public removeImage(index: number) {
        let image = this.files.splice(index, 1);
        this.cd.viewToModelUpdate(this.files);
        this._onRemove(image[0]);
    }

    // -----------------------------------------------------------------

    /**
     * Process configuration object to set personalisation.
     *
     * @private
     */
    private _processOptions() {
        if (this.opts != null) {
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

            // accepts
            if (this.opts.accepts != null) {
                this.config.accepts = this.opts.accepts;
            }

            // maxFilesizeSum
            if (this.opts.maxFilesizeSum != null) {
                this.config.maxFilesizeSum = this.opts.maxFilesizeSum;
            }
        }
    }

    /**
     * Emit an onremove event
     *
     * @private
     * @param {ImageUpload} image
     */
    private _onRemove(image: ImageUpload) {
        this.onRemove.emit(image);
    }

    /**
     * Emit an onadd event
     *
     * @private
     * @param {ImageUpload} image
     */
    private _onAdd(image: ImageUpload) {
        this.onAdd.emit(image);
    }

    private _onError(error: Error) {
        this.onError.emit(error);
    }

    /**
     * Called after file read
     *
     * @private
     */
    private _fileReaderLoad = () => {
        let data = this.fileReader.result;

        let img = new ImageUpload(data, this.currentFile.name, this.currentFile.size);

        if (!this._validateFilesize(img)) return;

        this._onAdd(img);

        this.files.push(img);
        this.cd.viewToModelUpdate(this.files);
    }

    private _validateFilesize = (image: ImageUpload) => {
        debugger;
        if (this.config.maxFilesizeSum != null) {
            let total = (this.totalUploadedSize + image.size) / BYTES_IN_ONE_MB;

            if (total > this.config.maxFilesizeSum) {
                this._onError({ type: ErrorType.ExceedsUploadLimit, message: `Limit is set to ${this.config.maxFilesizeSum} MB, got ${total} MB.`});
                return false;
            }
        }

        return true;
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

}
