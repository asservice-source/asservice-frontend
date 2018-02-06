import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Service_Profile } from '../../api-managements/service-profile';
declare var $;

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['./profile-management.component.css']
})

export class ProfileManagementComponent extends BaseComponent implements OnInit {

    public validate: InputValidateInfo = new InputValidateInfo();

    public apiHttp: Service_Profile = new Service_Profile();

    public imageFile: any;
    public firstName: string = "";
    public lastName: string = "";

    public loading: boolean = false;

    constructor(private route: Router) {
        super();
    }

    ngOnInit() {

    }

    onClickSave() {
        let self = this;

        self.apiHttp.edit_profile(self.userInfo.personId, self.firstName, self.lastName, self.imageFile, function (d) {
            self.imageFile = null;
            self.route.navigate(['']);
        });
    }

    onClickCancel() {
        let self = this;

        self.route.navigate(['']);
    }

    onFileChange(event: EventTarget) {
        let self = this;

        self.imageFile = null;
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        self.imageFile = files[0];
        console.log(self.imageFile);

        if (self.imageFile.size > 5242880) {

        }

        if (self.imageFile.type != 'image/jpeg' && self.imageFile.type != 'image/png') {

        }

        self.readURL(self.imageFile);
    }

    readURL(file) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e: any) {
                $('#imgProfile').attr('src', e.target.result);
            }

            reader.readAsDataURL(file);
        }
    }

}