import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";

export class Service_Profile extends ApiHTTPService {

    public attr: any;

    constructor() {
        super();
    }

    public change_password(id: string, oldPassword: string, newPassword: string, callback: (doc: any) => void) {
        let self = this;

        let parameters = { "id": id, "oldPassword": oldPassword, "newPassword": newPassword };

        self.post('survey_pregnant/ins_upd_pregnant_info', parameters, function (d) {
            callback(d);
        });
    }

}