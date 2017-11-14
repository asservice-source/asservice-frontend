import { DeadBean } from "../beans/dead.bean";
import { ApiHTTPService } from "./api-http.service";
import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";

export class Service_SurveyDead{

   public attr: any;
   public apiHTTPService: ApiHTTPService = new ApiHTTPService();

   constructor(){
    
   }
   public map(bean: DeadBean): any{
        this.attr = 
        {
            "rowGUID": bean.rowGUID,
            "documentID": bean.documentId, //"3BAA6996-A8AD-E711-AB84-005056C00008",
            "osmId": bean.osmId, //"0848DE88-BAC2-E711-AB84-005056C00008",
            "personId": bean.personId, //"7006AF7A-CFC2-E711-AB84-005056C00008",
            "deathDate": bean.dateDead, //"2017-11-13 10:08:00.0",
            "hospDeath": bean.hospDeath,//"อิอิ",
            "age": bean.age, //44,
            "isDiabetes": bean.isDiabetes, //true,
            "isHypertension": bean.isHypertension,//true,
            "isAccident": bean.isAccident, //true,
            "isCancer": bean.isCancer, //true,
            "cancerTypeID": bean.cancerTypeID, //1,
            "causeOther": bean.causeOther, //"จิตใจถูกกระทบกระเทือน",
            "isCongenitalDisease": bean.isCongenitalDisease, //true,
            "deathPlaceCode": bean.deathPlaceCode, //"1",
            "placeOther": bean.placeOther//"ที่อื่นๆ"
        }

        return  this.attr;
   }
   public getList(filter: FilterHeadSurveyBean, callback: (doc: any) => void){
       let parameter = this.apiHTTPService.api_mapFilterSurveyHeader(filter);
       console.log("parameter = = = ");
       console.log(parameter);
        this.apiHTTPService.callResponse('survey_death/search_death_info_list'
        , parameter
        , callback);
    }

   public commit_save(bean: DeadBean, callback: (doc: any) => void){
        let parameter = this.map(bean);
        this.apiHTTPService.post('survey_death/ins_upd_death_info', parameter , callback);
   }

   public commit_del(rowGUID: string, callback: (doc: any) => void){
        let parameter = {"rowGUID": rowGUID};
        this.apiHTTPService.post('survey_death/del_death_info', parameter , callback);
    }
}