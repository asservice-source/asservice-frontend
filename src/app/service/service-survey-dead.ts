import { DeadBean } from "../beans/dead.bean";
import { ApiHTTPService } from "./api-http.service";
import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";
import { BaseComponent } from "../base-component";

export class Service_SurveyDead extends ApiHTTPService {

   public attr: any;
   constructor(){
    super();
   }
   public map(bean: DeadBean): any{
        this.attr = 
        {
            "rowGUID": bean.rowGUID,
            "documentId": bean.documentId, //"3BAA6996-A8AD-E711-AB84-005056C00008",
            "osmId": bean.osmId, //"0848DE88-BAC2-E711-AB84-005056C00008",
            "personId": bean.personId, //"7006AF7A-CFC2-E711-AB84-005056C00008",
            "deathDate": bean.deathDate, //"2017-11-13 10:08:00.0",
            "hospDeath": bean.hospDeath,//"อิอิ",
            "age": bean.age, //44,
            "isDiabetes": bean.isDiabetes, //true,
            "isHypertension": bean.isHypertension,//true,
            "isAccident": bean.isAccident, //true,
            "isCancer": bean.isCancer, //true,
            "cancerTypeId": bean.cancerTypeId, //1,
            "causeOther": bean.causeOther, //"จิตใจถูกกระทบกระเทือน",
            "isNoDisease": bean.isNoDisease, //true,
            "deathPlaceCode": bean.deathPlaceCode, //"1",
            "placeOther": bean.placeOther//"ที่อื่นๆ"
        }

        return  this.attr;
   }
   public getList(filter: FilterHeadSurveyBean, callback: (doc: any) => void){
       let parameter = this.api_mapFilterSurveyHeader(filter);
       console.log('>>>>> DEATH LIST <<<<<');
       console.log(parameter);
        this.callResponse('survey_death/search_death_info_list'
        , parameter
        , callback);
    }

   public commit_save(bean: DeadBean, callback: (doc: any) => void){
       
        let parameter = this.baseComponent.strNullToEmpty(this.map(bean));
        console.log(" = = = parameter = = = survey_death/ins_upd_death_info");
        console.log(parameter);
        this.post('survey_death/ins_upd_death_info', parameter , callback);
   }

   public commit_del(rowGUID: string, callback: (doc: any) => void){
        let parameter = {"rowGUID": rowGUID};
        this.post('survey_death/del_death_info', parameter , callback);
    }
}