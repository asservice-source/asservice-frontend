import { Router } from "@angular/router";
import { UserService } from "./user.service";

export class SessionManagement {
    constructor(private router:Router, private userService: UserService){
        
    }
    initUserSession(): boolean{
        let jsonUInfo: any = localStorage.getItem("uinfo");
        if(!jsonUInfo){
            this.router.navigate(["login"]);
            return false;
        }else{
            let timesLate = (3600000/2); // = 30 minute
            let sessionTimes: number = +localStorage.getItem('sessionTimes');
            let diffTime: number = Date.now() - sessionTimes;
            if(diffTime > timesLate){
                localStorage.clear(); 
                this.router.navigate(["login"]);
                return false;
            }
            localStorage.setItem("sessionTimes", (Date.now()).toString());
            jsonUInfo = JSON.parse(jsonUInfo);
            this.userService.set(jsonUInfo);
            return true;
        }
    }
}