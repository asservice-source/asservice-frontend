import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
declare var $: any;
export class BaseComponent implements OnInit{
    public labelManager = new LabelManager();
    constructor() {   
        
    }
    ngOnInit(){
    }
    getLabel(key:string, lang?:string, defaultValue?:string ){
        console.log("label:"+key);
        return this.labelManager.getLabel(key,lang) || defaultValue;
    }
}