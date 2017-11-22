import { ApiHTTPService } from "./api-http.service";
import { HomeBean } from "../beans/home.bean";
import { BaseComponent } from "../base-component";

export class Service_Home extends ApiHTTPService{

    public attr: any;
    public baseComp: BaseComponent;
    constructor(){
        super();
        this.base = new BaseComponent();
    }
    public map(bean: HomeBean):any{
        this.attr = {
        "id":"",
        "registrationId": bean.registrationId,
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
        "holderId": ""
        }
        return this.attr;
    }
    public commit_save(bean: HomeBean, callback:(doc:any)=>void){
        let parameter = this.base.strNullToEmpty(this.map(bean));
        this.post('home/ins_upd_home', parameter, function(response){
            console.log(response);
            callback(response);
        });
    }

    public getList(villageId: string, osmId: string, callback: (doc: any) => void){
        this.api_HomeList(villageId, osmId, function(response){
            callback(response);
        });
    }

    public commit_del(homeId: string, callback:(doc:any)=>void){
        let parameter = {"homeId": homeId};
        this.post('home/del_home', parameter, function(response){
            console.log(response);
            callback(response);
        });
    }
}