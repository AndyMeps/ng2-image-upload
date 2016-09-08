import { NgModule } from '@angular/core';

import { ImageUploadComponent } from './components';
import { FileSizePipe } from './pipes';

@NgModule({
    declarations: [
        ImageUploadComponent,
        FileSizePipe
    ],
    exports: [
        ImageUploadComponent,
        FileSizePipe
    ]
})
export class ImageUploadModule { }
