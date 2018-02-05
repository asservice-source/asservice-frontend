import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { SessionManagement } from './session.conf';

@Injectable()
export class GuardPermissionService {
    private session: SessionManagement;
    constructor(private router:Router, private userService: UserService) {
        this.session = new SessionManagement(this.router, this.userService);
     }
    canActivate(){
        console.log("GuardPermissionService");
        // let jsonUInfo: any = localStorage.getItem("uinfo");
        // if(!jsonUInfo){
        //     this.router.navigate(["login"]);
        //     return false;
        // }

        let isSession: boolean = this.session.initUserSession();
        if(isSession && (this.userService.roleId=='2' || this.userService.roleId=='3')){
            return true;
        }else{
            this.router.navigate([""]);
            return false;
        }
    }
}