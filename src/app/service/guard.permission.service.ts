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
        console.log("canActivate : Permission");
        return this.activate();
    }
    canActivateChild(){
        console.log("canActivateChild : Permission");
        return this.activate();
    }
    activate(): boolean{
        let isSession: boolean = this.session.initUserSession();
        if(!isSession){
            this.router.navigate(["login"]);
            return false;
        }else if(isSession && (this.userService.roleId=='2' || this.userService.roleId=='3')){
            return true;
        }else{
            console.log("navigate :: GuardPermissionService");
            this.router.navigate([""]);
            return false;
        }
    }
}