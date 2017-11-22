import { ApiHTTPService } from "./api-http.service";
import { HomeBean } from "../beans/home.bean";

export class Service_Home extends ApiHTTPService{

    public attr: any;
    public map(bean: HomeBean):any{
        this.attr = {
        "id":"",
        "registrationId": bean.homeRegisterId,
        "homeTypeId": bean.homeTypeId,
        "homeNo": bean.homeNo,
        "villageId":  bean.villageId,
        "name": bean.name,
        "road": bean.road,
        "soi": bean.soi,
        "telephone": bean.telephone,
        "latitude": bean.latitude,
        "longitude": bean.longitude,
        "osmId": bean.osmId,
        "holderId": bean.holderId
        }
        return this.attr;
    }
}