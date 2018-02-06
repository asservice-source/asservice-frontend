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

    public edit_profile(personId: string, firstName: string, lastName: string, file: any, callback: (doc: any) => void) {
        let self = this;

        let parameters = { "personId": personId, "firstName": firstName, "lastName": lastName };

        if (file) {
            self.upload_profile(personId, file, function (d) {

            });
        } else {

        }

        callback('');
    }

    public upload_profile(personId: string, file: any, callback: (doc: any) => void) {
        let self = this;

        let url = myconf.API_SERVER_URL + 'file_upload/upload_profile';
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        formData.append("file", file, file.name);
        formData.append("personId", personId);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // resolve(JSON.parse(xhr.response));
                } else {
                    // reject(xhr.response);
                }
            }
        };

        setInterval(() => { }, 500);

        xhr.open('POST', url, false);
        xhr.send(formData);

        callback(xhr);
    }

}