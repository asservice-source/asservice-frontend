import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Service_Profile } from '../../api-managements/service-profile';
import { LocalStorageManagement } from '../../service/localStorage-management';
declare var $;

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['./profile-management.component.css']
})

export class ProfileManagementComponent extends BaseComponent implements OnInit {

    public validate: InputValidateInfo = new InputValidateInfo();

    public apiHttp: Service_Profile = new Service_Profile();
    public storage: LocalStorageManagement;

    public imageFile: any;
    public firstName: string = "";
    public lastName: string = "";

    public tmpPictureFilePath: string = "";

    public loading: boolean = false;

    constructor(private route: Router) {
        super();

        let self = this;

        self.storage = new LocalStorageManagement(self.userInfo);
    }

    ngOnInit() {
        let self = this;

        self.firstName = self.userInfo.firstName;
        self.lastName = self.userInfo.lastName;
    }

    onClickSave() {
        let self = this;

        self.loading = true;

        let countError = 0;
        self.apiHttp.upload_profile(self.userInfo.personId, self.imageFile, function (d) {
            if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
                if (self.imageFile) {
                    let fullVersionPath = d.fullPath + '?v=' + Date.now();
                    self.imageFile = null;
                    self.userInfo.picturePath = fullVersionPath;
                    self.storage.updateStorage();
                }
            } else {
                self.userInfo.picturePath = self.tmpPictureFilePath
                self.storage.updateStorage();
                countError++;
            }

            self.apiHttp.edit_profile(self.userInfo.personId, self.firstName, self.lastName, function (d) {
                if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
                    self.userInfo.firstName = self.firstName;
                    self.userInfo.lastName = self.lastName;
                    self.storage.updateStorage();
                } else {
                    countError++;
                }
            });

            if (countError <= 0) {
                self.message_success('', 'แก้ไขข้อมูลส่วนตัวสำเร็จ');
            } else {
                self.message_error('', 'แก้ไขข้อมูลส่วนตัวไม่สำเร็จ');
            }
            self.loading = false;
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
            self.message_error('', 'ไฟล์รูปต้องมีขนาดไม่เกิน 5MB');
            return;
        }

        if (self.imageFile.type != 'image/jpeg' && self.imageFile.type != 'image/png') {
            self.message_error('', 'ไฟล์รูปต้องมีนามสกุลเป็น jpg และ png เท่านั้น');
            return;
        }

        self.readURL(self.imageFile);
    }

    readURL(file) {
        let self = this;

        if (file) {
            self.tmpPictureFilePath = self.userInfo.picturePath;

            var reader = new FileReader();

            reader.onload = function (e: any) {
                $('#imgProfile').attr('src', e.target.result);
            }

            reader.readAsDataURL(file);
        }
    }

}