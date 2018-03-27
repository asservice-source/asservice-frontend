import { BaseComponent } from "../base-component";
import { UserService } from "../service/user.service";

export class LocalStorageManagement{
    private baseComponent: BaseComponent;
    public static UINFOKEY:string = window.btoa('uinfo');
    constructor(public user: UserService){
        this.baseComponent = new BaseComponent();
    }
    setUserInfo(data: any){
        let obj = this.baseComponent.strNullToEmpty(data);
        if(!obj.userId){
            obj = JSON.parse(obj);
        }
        let item =  window.btoa(encodeURIComponent(JSON.stringify(obj)));
        localStorage.setItem(LocalStorageManagement.UINFOKEY, item);
        //localStorage.setItem("sessionTimes", btoa((Date.now()).toString()));
        
        this.user.sid = obj.sid
        this.user.userId = obj.userId
        this.user.personId =  obj.personId
        this.user.citizenId =  obj.citizenId || ''
        this.user.roleId = obj.roleId
        this.user.username = obj.userName || ''
        this.user.fullName = obj.fullName || ''
        this.user.firstName = obj.firstName || ''
        this.user.lastName = obj.lastName || ''
        this.user.hospitalCode5 = obj.code5 || obj.hospitalCode5 || ''
        this.user.hospitalCode9 = obj.code9 || obj.hospitalCode9 || ''
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
        this.user.picturePath = obj.picturePath  || '../../assets/img/avatar5.png'
        this.user.hospitalProvinceName = obj.hospitalProvinceName || '';
        this.user.hospitalAmphurName = obj.hospitalAmphurName || '';
        this.user.hospitalTumbolName = obj.hospitalTumbolName || '';
        this.user.hospitalZipCode = obj.hospitalZipCode || '';


    }
    updateStorage(){
        let item = '';
        if(this.user && this.user.userId){
          item =  window.btoa(encodeURIComponent(JSON.stringify(this.user)));
        }
        localStorage.setItem(LocalStorageManagement.UINFOKEY, item);
    }
    getDataUserInfo():any{
      try {
        let item = localStorage.getItem(LocalStorageManagement.UINFOKEY);
        if(item){
          return decodeURIComponent(window.atob(item));
        }else {
          return undefined;
        }
      }catch(e) {
        //console.error("User Error", e);
        localStorage.clear();
        return undefined;
      }
    }
    // setSessionTimes(){
    //     let item = window.btoa((Date.now()).toString())
    //     localStorage.setItem("sessionTimes", item);
    // }
    // getSessionTimes():number{
    //   let item = localStorage.getItem("sessionTimes");
    //   if(item){
    //     return +(window.atob(item));
    //   }else{
    //     return undefined;
    //   }
    // }
}
