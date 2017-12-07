import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class GuardService {

    constructor(private router:Router, private user: UserService) { }
    canActivate(){
        console.log("canActivate");
        let jsonUInfo: any = localStorage.getItem("uinfo");
        if(!jsonUInfo){
            
            this.router.navigate(["login"]);
            return false;

        }else{

            jsonUInfo = JSON.parse(jsonUInfo);
            this.user.userId = jsonUInfo["uid"];
            this.user.userRoleId = jsonUInfo["urid"];
            this.user.userFullName = jsonUInfo["ufullName"];
            this.user.hospitalCode5 = jsonUInfo["hospitalCode5"];

            return true;
        }
    }
}