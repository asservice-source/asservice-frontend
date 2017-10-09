import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import * as myconf  from "./global-config";
declare var $: any;
export class BaseComponent implements OnInit{
    public labelManager = new LabelManager();
    public _GLOBAL = myconf;
    constructor() {   
        
    }
    ngOnInit(){
    }
    public getLabel(key:string, lang?:string, defaultValue?:string ){
        ///console.log("label:"+key);
        return this.labelManager.getLabel(key,lang) || defaultValue;
    }
    public getApiUrl(urlAPI:string){
        return this._GLOBAL.API_SERVER_URL + urlAPI;
    }
}