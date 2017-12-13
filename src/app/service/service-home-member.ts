import { ApiHTTPService } from "./api-http.service";
import { BaseComponent } from "../base-component";
import { PersonalBasicBean } from "../beans/personal-basic.bean";

export class Service_HomeMember extends ApiHTTPService{

    public attr: any;
    public baseComp: BaseComponent;
    constructor(){
        super();
        this.base = new BaseComponent();
    }
    public map(bean: PersonalBasicBean):any{
        this.attr = {
            
            "citizenId": bean.citizenId,
            "prefixCode": bean.prefixCode,
            "firstName": bean.firstName,
            "lastName": bean.lastName,
            "nickName": "",
            "genderId": bean.genderId,
            "raceCode": bean.raceCode,
            "nationCode": bean.nationalityCode,
            "religionCode": bean.religionCode,
            "bloodTypeId": bean.bloodTypeId,
            "rhGroupId": bean.rhGroupId,
            "birthDate": bean.birthDate,
            "educationCode": bean.educationCode,
            "occupCode": bean.occupationCode,
            "laborCode":"",
            "passport": "",
            "isDead":  false,
            "deadDate": "",
            "dischargeId": bean.dischargeId,
            "familyStatusId": bean.familyStatusId,
            "fatherCid": "",
            "motherCid": "",
            "coupleCid": "",
            "personId": bean.personId,
            "homeId": bean.homeId,
            "isGuest": bean.isGuest,
            "isExists": 0,
            "mStatusCode": "",
            "vStatusCode": "",
            "congenitalDisease": "",
            "remark": "",
            "homeNo": bean.homeNo,
            "mooNo": bean.mooNo,
            "road": bean.road,
            "provinceCode": bean.provinceCode,
            "amphurCode": bean.amphurCode,
            "tumbolCode": bean.tumbolCode
        }
        return this.attr;
    }
    public commit_save(bean: PersonalBasicBean, callback:(doc:any)=>void){
        let parameter = this.base.strNullToEmpty(this.map(bean));
        console.log('<<<< Params >>>>');
        console.log(parameter);
        this.post('survey_population/population_add_home_member', parameter, function(response){
            console.log(response);
            callback(response);
        });
    }

    public getList(homeId: string, callback: (doc: any) => void){
        
        let parameter = {
            "homeId": homeId
           }
        let _self = this;
        this.post('homemember/homemember_by_home', parameter, function(response){
            console.log(parameter);
            console.log(response);
            if(response && response.status.toString().toUpperCase()=='SUCCESS'){
                console.log("Before CallBack");
                callback(response.response);
            }else{
                _self.baseComp.message_servNotRespond('', response.message);
            }
        });
    }

}