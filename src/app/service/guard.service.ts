import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class GuardService {
    user = new UserService();
    constructor(private router:Router,) { }
    canActivate(){
        if(!localStorage.getItem("login")){
            this.router.navigate(["login"]);
            return false;
        }else{
            return true;
        }
    }
}