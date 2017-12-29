import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";
import { BaseComponent } from "../base-component";
import { ApiHTTPService } from "./api-http.service";
import { PersonalBasicBean } from "../beans/personal-basic.bean";

export class Service_UserStaffAndOSM extends ApiHTTPService{

   public attr: any;
   constructor(){
    super();
   }
   public map(isStaff:boolean, bean: PersonalBasicBean): any{
        this.attr = 
            {
                "personId": bean.personId
                ,"citizenId": this.baseComponent.reverseFormatCitizenId(bean.citizenId)
                ,"genderId": bean.genderId
                ,"prefixCode": bean.prefixCode
                ,"firstName": bean.firstName
                ,"lastName": bean.lastName
                ,"birthDate": bean.birthDate
                ,"villageId": bean.villageId
                ,"code5": bean.hospitalCode5
                ,"userRoleId": bean.roleId
                ,"active": bean.isActive
            };
        if(isStaff){
            delete this.attr["villageId"];
        }
        return this.attr;
   }

   public commit_save(isStaff:boolean, bean: PersonalBasicBean, callback: (doc: any) => void){
        let parameter = this.baseComponent.strNullToEmpty(this.map(isStaff, bean));
        this.post('user/insert_update', parameter , function(resp){
            callback(resp);
        });
    } 

    public getUserById(userId: string, callback: (doc: any) => void){
        let parameter = {"userId": userId};
        this.post('user/info', parameter, function(resp){
            callback(resp);
        });
    }
    public commit_del(userId: string, callback: (doc: any)=>void){
        let parameter = {"deleteId": userId};
        this.post('user/insert_update', parameter, function(resp){
            callback(resp);
        });
    }
    public osm_findList(name: string, villageId: string, callback:(doc: any) => void): any{
        let parameter = {"name": name, "villageId": villageId, "code5": this.baseComponent.getHospitalCode()};
        this.callResponse('/user/find/osm', parameter, function(resp){
            callback(resp);
        });
    }

    public staff_findList(name: string, callback:(doc: any) => void): any{
        let parameter = {"name": name, "code5": this.baseComponent.getHospitalCode()};
        this.callResponse('/user/find/staff', parameter, function(resp){
            callback(resp);
        });
    }
    
    
}