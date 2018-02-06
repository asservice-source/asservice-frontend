import { Injectable, Optional } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BaseComponent } from '../base-component';
import { SessionManagement } from './session.conf';

@Injectable()
export class GuardService {
    private session: SessionManagement;
    constructor(private router:Router, private userService: UserService) { 
        this.session = new SessionManagement(this.router, this.userService);
    }
    canActivate(){
        console.log("canActivate");
        return this.session.initUserSession();
    }
    canActivateChild(){
        console.log("canActivateChild");
        return this.session.initUserSession();
    }

}