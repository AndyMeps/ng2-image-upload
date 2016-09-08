export interface IImageUploadConfiguration {
    addSectionHeader?: string;
    uploadedHeader?: string;
    buttonLabel?: string;
}

export class ImageUploadConfiguration implements IImageUploadConfiguration {
    public addSectionHeader: string;
    public uploadedHeader: string;
    public buttonLabel: string;

    constructor() {
        this.addSectionHeader = 'Select Images:';
        this.uploadedHeader = 'Uploaded Images:';
        this.buttonLabel = "Choose Image";
    }
}
