import { BaseComponent } from "../base-component";
import { UserService } from "../service/user.service";

export class LocalStorageManagement{
    private baseComponent: BaseComponent;

    constructor(public user: UserService){
        this.baseComponent = new BaseComponent();
    }
    setUserInfo(data: any){
        let obj = this.baseComponent.strNullToEmpty(data);
        if(!obj.userId){
            obj = JSON.parse(obj);
        }
        localStorage.setItem("uinfo", JSON.stringify(obj));
        localStorage.setItem("sessionTimes", (Date.now()).toString());

        this.user.userId = obj.userId
        this.user.personId =  obj.personId
        this.user.citizenId =  obj.citizenId || ''
        this.user.roleId = obj.roleId
        this.user.username = obj.userName || ''
        this.user.fullName = obj.fullName || ''
        this.user.firstName = obj.firstName || ''
        this.user.lastName = obj.lastName || ''
        this.user.hospitalCode5 = obj.code5
        this.user.hospitalCode9 = obj.code9
        this.user.hospitalName = obj.hospitalName  || ''
        this.user.hospitalDisplayName = obj.hospitalDisplayName  || ''
        this.user.villageId = obj.villageId
        this.user.villageNo = obj.villageNo || ''
        this.user.villageName = obj.villageName || ''
        this.user.birthDate = obj.birthDate
        this.user.address = obj.address || ''
        this.user.roleAcronym = obj.roleAcronym  || ''
        this.user.genderId = obj.genderId;
        this.user.genderName = obj.genderName  || ''
        this.user.picturePath = obj.picturePath  || ''

    }
    updateStorage(){
        localStorage.setItem("uinfo", JSON.stringify(this.user));
    }
    getDataUserInfo():any{
        return localStorage.getItem("uinfo");
    }
    setSessionTimes(){
        localStorage.setItem("sessionTimes", (Date.now()).toString());
    }
    getSessionTimes():number{
        return +localStorage.getItem('sessionTimes');
    }
}