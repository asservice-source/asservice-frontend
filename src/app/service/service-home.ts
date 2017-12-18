import { ApiHTTPService } from "./api-http.service";
import { HomeBean } from "../beans/home.bean";
import { BaseComponent } from "../base-component";

export class Service_Home extends ApiHTTPService{

    public attr: any;
    constructor(){
        super();
    }
    public map(bean: HomeBean):any{
        this.attr = {
        "id": bean.homeId,
        "registrationId": bean.registrationId,
        "homeTypeCode": bean.homeTypeCode,
        "homeNo": bean.homeNo,
        "villageId":  bean.villageId,
        "name": bean.name,
        "road": bean.road,
        "soi": bean.soi,
        "telephone": bean.telephone,
        "latitude": bean.latitude,
        "longitude": bean.longitude,
        "osmId": bean.osmId
        }
        return this.attr;
    }
    public commit_save(bean: HomeBean, callback:(doc:any)=>void){
        let parameter = this.baseComponent.strNullToEmpty(this.map(bean));
        this.post('home/ins_upd_home', parameter, function(response){
            callback(response);
        });
    }

    public getList(villageId: string, osmId: string, callback: (doc: any) => void){
        
        let parameter = {
            "villageId": villageId,
            "osmId": osmId
           }
        let _self = this;
        this.post('/home/home_list_by_village_or_osm', parameter, function(response){
            if(response && response.status.toString().toUpperCase()=='SUCCESS'){
                callback(response.response);
            }else{
                _self.baseComponent.message_servNotRespond('', response.message);
            }
        });
    }

    public commit_del(homeId: string, callback:(doc:any)=>void){
        let parameter = {"homeId": homeId};
        this.post('home/del_home', parameter, function(response){
            callback(response);
        });
    }
}