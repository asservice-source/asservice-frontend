import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class GuardPermissionService {
    constructor(private router:Router, private userInfo: UserService) {

     }
    canActivate(){
        console.log("GuardPermissionService");
        if(this.userInfo.roleId=='2'){
            return true;
        }else{
            this.router.navigate([""]);
            return false;
            //return true;
        }
    }
}