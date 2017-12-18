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
            "hospitalCode": this.baseComponent.getHospitalCode(),
            "createdBy": this.baseComponent.getUserFullName(),
            "villageNo": bean.villageNo,
            "villageName": bean.villageName.trim()
        };

        return this.attr;
   }

   public commit_save(bean: VillageBean, callback: (doc: any) => void){
        let parameter = this.baseComponent.strNullToEmpty(this.map(bean));
        this.post('village/ins_upd_village', parameter , callback);
    }  
}