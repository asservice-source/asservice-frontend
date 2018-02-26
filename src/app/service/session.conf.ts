import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { LocalStorageManagement } from "./localStorage-management";

export class SessionManagement {
    private storage: LocalStorageManagement;
    constructor(private router:Router, private userService: UserService){
        this.storage = new LocalStorageManagement(this.userService);
    }
    initUserSession(): boolean{
        let jsonUInfo: any = this.storage.getDataUserInfo();
        if(!jsonUInfo){
            this.router.navigate(["login"]);
            return false;
        }else{
            let timesLate = (3600000/2); // = 30 minute
            let sessionTimes: number = this.storage.getSessionTimes();
            let diffTime: number = Date.now() - sessionTimes;
            console.log("diffTime", diffTime);
            if(sessionTimes == undefined || diffTime > timesLate){
                localStorage.clear();
                this.router.navigate(["login"]);
                return false;
            }
            this.storage.setSessionTimes();
            this.storage.setUserInfo(jsonUInfo);
            if(!this.userService.userId){
                this.router.navigate(["login"]);
                return false;
            }
            return true;
        }
    }
}
