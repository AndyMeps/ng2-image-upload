export interface IImageUploadConfiguration {
    addSectionHeader?: string;
    uploadedHeader?: string;
    buttonLabel?: string;
    accepts?: string[];
}

export class ImageUploadConfiguration implements IImageUploadConfiguration {
    public addSectionHeader: string;
    public uploadedHeader: string;
    public buttonLabel: string;
    public accepts: string[];

    constructor() {
        this.addSectionHeader = 'Select Images:';
        this.uploadedHeader = 'Uploaded Images:';
        this.buttonLabel = "Choose Image";
        this.accepts = ["image/*"];
    }
}
