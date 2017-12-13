import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";
import { BaseComponent } from "../base-component";
import { ApiHTTPService } from "./api-http.service";
import { VillageBean } from "../beans/village.bean";

export class Service_Village extends ApiHTTPService{

   public attr: any;
   constructor(){
    super();
   }
   public map(bean: VillageBean): any{
        this.attr = 
        {
            "hospitalCode": this.base.getHospitalCode(),
            "createdBy": this.base.getUserFullName(),
            "villageNo": bean.villageNo,
            "villageName": bean.villageName.trim()
        };

        return this.attr;
   }

   public commit_save(bean: VillageBean, callback: (doc: any) => void){
        let parameter = this.base.strNullToEmpty(this.map(bean));
        console.log(" = = = parameter = = = village/add_village");
        console.log(parameter);
        this.post('village/add_village', parameter , callback);
    }  
}