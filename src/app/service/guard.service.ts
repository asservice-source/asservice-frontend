import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BaseComponent } from '../base-component';

@Injectable()
export class GuardService {
    private baseComp: BaseComponent;
    constructor(private router:Router, private user: UserService) { }
    canActivate(){
        console.log("canActivate");
        this.baseComp = new BaseComponent();
        let jsonUInfo: any = localStorage.getItem("uinfo");
        if(!jsonUInfo){
            
            this.router.navigate(["login"]);
            return false;

        }else{

            jsonUInfo = JSON.parse(jsonUInfo);
            this.baseComp.copyObj(jsonUInfo, this.user);

            return true;
        }
    }
}