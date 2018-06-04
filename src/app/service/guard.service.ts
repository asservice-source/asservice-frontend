import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BaseComponent } from '../base-component';
import { LocalStorageManagement } from './localStorage-management';

@Injectable()
export class GuardService {
    private localstorage: LocalStorageManagement;
    private basecomp: BaseComponent;
    constructor(private router:Router, private userService: UserService) { 
        this.localstorage = new LocalStorageManagement(userService, this.router);
        
        this.basecomp = new BaseComponent();
    }
    canActivate(){
        return this.activate();  
    }
    canActivateChild(){
        return this.activate();
    }
    activate(): boolean{
        console.log("=> SIGN PASS => canActivate");
        this.localstorage.setUserInfo(this.localstorage.getDataUserInfo());
        console.log("=> UserService", this.userService);
       if(!this.basecomp.isEmpty(this.userService.sid)){
            return  true;
       }else{
            return false;
       }
    }

}