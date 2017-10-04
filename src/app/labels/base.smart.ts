import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelService } from "./label.service";
declare var $: any;
export class BaseSmart implements OnInit{
    labelService = new LabelService();
    constructor() {   
        
    }
    ngOnInit(){
    }
    getLabel(key:string, lang?:string, defaultValue?:string ){
        console.log("label:"+key);
        return this.labelService.getLabel(key,lang) || defaultValue;
    }
}