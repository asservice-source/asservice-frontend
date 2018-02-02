import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Service_Profile } from '../../api-managements/service-profile';

@Component({
    selector: 'app-profile-management',
    templateUrl: './profile-management.component.html',
    styleUrls: ['./profile-management.component.css']
})

export class ProfileManagementComponent extends BaseComponent implements OnInit {

    public validate: InputValidateInfo = new InputValidateInfo();

    public apiHttp: Service_Profile = new Service_Profile();

    imageFile: any;

    constructor(private route: Router) {
        super();
    }

    onClickSave() {

    }

    onClickCancel() {
        this.route.navigate(['']);
    }

    onChange(event: EventTarget) {
        let self = this;

        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        self.imageFile = files[0];
        console.log(self.imageFile);

        self.apiHttp.edit_profile('', '', self.imageFile);
    }

}