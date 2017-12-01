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
            "personId": bean.personId,
            "citizenId": bean.citizenId,
            "firstName": bean.firstName,
            "lastName": bean.lastName,
            "birthDate": bean.birthDate,
            "genderId": bean.genderId,
            "prefixCode": bean.prefixCode,
            "raceCode": bean.raceCode,
            "nationalityCode": bean.nationalityCode,
            "bloodTypeId": bean.bloodTypeId,
            "rhGroupId": bean.rhGroupId,
            "occupationCode": bean.occupationCode,
            "educationCode": bean.educationCode,
            "religionCode": bean.religionCode,
            "familyStatusId": bean.familyStatusId,
        }
        return this.attr;
    }
    public commit_save(bean: PersonalBasicBean, callback:(doc:any)=>void){
        let parameter = this.base.strNullToEmpty(this.map(bean));
        console.log('<<<< Params >>>>');
        console.log(parameter);
        this.post('home/ins_upd_home', parameter, function(response){
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
                callback(response.response);
            }else{
                _self.baseComp.message_servNotRespond('', response.message);
            }
        });
    }

}