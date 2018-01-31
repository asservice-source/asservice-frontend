import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";

export class Service_Profile extends ApiHTTPService {

    public attr: any;

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

}