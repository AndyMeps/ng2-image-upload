import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from 'ng2-bootstrap';

import { ImageUploadComponent } from './components';
import { FileSizePipe } from './pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
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
