import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";
import * as myconf from "../global-config";
import { Service_FileUpload } from '../api-managements/service-upload';

export class Service_Profile extends ApiHTTPService {

    public attr: any;
    public service_upload: Service_FileUpload = new Service_FileUpload();

    constructor() {
        super();
    }

    public change_password(id: string, username: string, oldPassword: string, newPassword: string, callback: (doc: any) => void) {
        let self = this;

        let parameters = { "id": id, "username": username, "oldPassword": oldPassword, "newPassword": newPassword };

        self.post('user/change_password', parameters, function (d) {
            callback(d);
        });
    }

    public edit_profile(firstName: string, lastName: string, imageFile: any) {
        let self = this;

        let parameters = { "firstName": firstName, "lastName": lastName };

        let url = myconf.API_SERVER_URL + 'file_upload/upload_profile';
        self.service_upload.upload(url, imageFile, function (d) {
            console.log('service_upload', d);
        });
    }

}