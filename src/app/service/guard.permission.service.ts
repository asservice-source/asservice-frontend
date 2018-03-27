import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BaseComponent } from '../base-component';

@Injectable()
export class GuardPermissionService {
    private baseComp: BaseComponent;
    constructor(private router:Router, private userService: UserService) {
        this.baseComp = new BaseComponent();
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
    
        // if(!isSession){
        //     this.router.navigate(["login"]);
        //     return false;
        // }else 
        if(this.baseComp.isStaffRole(this.userService.roleId)){
            return true;
        }else{
            console.log("navigate :: GuardPermissionService");
            this.router.navigate([""]);
            return false;
        }
    }
}