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
   public map(bean: PersonalBasicBean): any{
        this.attr = 
            {
                "personId": bean.personId
                ,"citizenId": bean.citizenId
                ,"genderId": bean.genderId
                ,"prefixCode": bean.prefixCode
                ,"firstName": bean.firstName
                ,"lastName": bean.lastName
                ,"birthDate": this.baseComp.getStringDateForDatePickerModel(bean.birthDate)
                ,"villageId": bean.villageId
                ,"code5": bean.hospitalCode5
                ,"userRoleId": bean.userRoleId
                ,"active": bean.userActive
            };

        return this.attr;
   }

   public commit_save(bean: PersonalBasicBean, callback: (doc: any) => void){
        let parameter = this.baseComp.strNullToEmpty(this.map(bean));
        console.log(" = = = parameter = = = user/insert_update");
        console.log(parameter);
        this.post('user/insert_update', parameter , function(response){
            console.log(response);
            callback(response);
        });
    } 

    public osm_findList(name: string, villageId: string, callback:(doc: any) => void): any{
        let parameter = {"name": name, "villageId": villageId, "code5": this.base.getHospitalCode()};
        this.callResponse('/user/find/osm', parameter, function(response){
            console.log(response);
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