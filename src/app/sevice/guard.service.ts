import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class GuardService {

    constructor(private router:Router) { }
    canActivate(){
        if(!localStorage.getItem("login")){
            this.router.navigate(["login"]);
            return false;
        }else{
            return true;
        }
    }
}