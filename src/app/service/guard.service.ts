import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BaseComponent } from '../base-component';
import { SessionManagement } from './session.conf';

@Injectable()
export class GuardService {
    private session: SessionManagement;
    private baseComp: BaseComponent;
    constructor(private router:Router, private userService: UserService) { 
        this.session = new SessionManagement(this.router, this.userService);
    }
    canActivate(){
        console.log("canActivate");
        return this.session.initUserSession();

        // this.baseComp = new BaseComponent();
        // let jsonUInfo: any = localStorage.getItem("uinfo");
        // if(!jsonUInfo){
        //     this.router.navigate(["login"]);
        //     return false;

        // }else{

        //     jsonUInfo = JSON.parse(jsonUInfo);
        //     //this.baseComp.copyObj(jsonUInfo, this.user);
        //     this.userService.set(jsonUInfo);

        //     return true;
        // }
    }
}