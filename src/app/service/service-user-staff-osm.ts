import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";
import { BaseComponent } from "../base-component";
import { ApiHTTPService } from "./api-http.service";
import { PersonalBasicBean } from "../beans/personal-basic.bean";

export class Service_UserStaffAndOSM extends ApiHTTPService{

   public attr: any;
   private baseComp: BaseComponent = new BaseComponent();
   constructor(){
    super();
   }
   public map(isStaff:boolean, bean: PersonalBasicBean): any{
        this.attr = 
            {
                "personId": bean.personId
                ,"citizenId": bean.citizenId
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
        let parameter = this.baseComp.strNullToEmpty(this.map(isStaff, bean));
        console.log(" = = = parameter = = = user/insert_update");
        console.log(parameter);
        this.post('user/insert_update', parameter , function(response){
            callback(response);
        });
    } 

    public commit_del(userId: string, callback: (doc: any)=>void){
        let parameter = {"deleteId": userId};
        console.log(" = = = parameter = = = user/insert_update");
        console.log(parameter);
        this.post('user/insert_update', parameter, function(response){
            callback(response);
        });
    }
    public osm_findList(name: string, villageId: string, callback:(doc: any) => void): any{
        let parameter = {"name": name, "villageId": villageId, "code5": this.base.getHospitalCode()};
        this.callResponse('/user/find/osm', parameter, function(response){
            callback(response);
        });
    }

    public staff_findList(name: string, callback:(doc: any) => void): any{
        let parameter = {"name": name, "code5": this.base.getHospitalCode()};
        this.callResponse('/user/find/staff', parameter, function(response){
            console.log(response);
            callback(response);
        });
    }
    
    
}