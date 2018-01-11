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

    public getList(villageId:string, osmId:string, homeTypeCode:string, name:string, callback: (doc: any) => void){
        
        let parameter = {
            "code5": this.baseComponent.getHospitalCode(),
            "villageId": villageId,
            "osmId": osmId,
            "homeTypeCode": homeTypeCode,
            "name": name,
           }
        let _self = this;
        this.post('/home/find', parameter, function(response){
            if(response && response.status.toUpperCase()=='SUCCESS'){
                callback(response.response);
            }else{
                callback([]);
                _self.baseComponent.message_servNotRespond('', '');
            }
        });
    }
    public getHomeWithoutOSM(villageId:string, callback: (doc: any) => void){
        
        let parameter = {
            "villageId": villageId,
           }
        let _self = this;
        this.post('/home/home_no_list_without_osm', parameter, function(response){
            if(response && response.status.toUpperCase()=='SUCCESS'){
                callback(response.response);
            }else{
                callback([]);
                _self.baseComponent.message_servNotRespond('', '');
            }
        });
    }
    public getHomeByID(homeId:string, callback: (doc: any) => void){

        this.api_HomrInfo(homeId, function(response){
            callback(response);
        });
        
    
    }

    public commit_del(homeId: string, callback:(doc:any)=>void){
        let parameter = {"homeId": homeId};
        this.post('home/del_home', parameter, function(response){
            callback(response);
        });
    }
}