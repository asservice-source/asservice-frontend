import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Service_Profile } from '../../api-managements/service-profile';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['./profile-management.component.css']
})

export class ProfileManagementComponent extends BaseComponent implements OnInit {

    public validate: InputValidateInfo = new InputValidateInfo();

    options: FancyImageUploaderOptions = {
        thumbnailHeight: 250,
        thumbnailWidth: 250,
        uploadUrl: 'D:/',
        allowedImageTypes: ['image/png', 'image/jpeg'],
        maxImageSize: 3
    };

    constructor(private route: Router) {
        super();
    }

    onClickSave() {

    }

    onClickCancel() {
        this.route.navigate(['']);
    }

    onUpload(file: UploadedFile) {
        console.log(file.response);
    }
}