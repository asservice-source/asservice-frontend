import { Component } from '@angular/core';
import { LabelStored } from "./label-stored";
export class LabelManager{
    public labelStored = new LabelStored();
    public labels;
    constructor(){
        this.labels = this.labelStored.labels;
    }
    getLabel(key:string, lang?:string){
        let value = null;
        if(!key){
            return '';
        }else{
            let objLabel = null;
            objLabel = this.labels[key];
            if(!objLabel){
                return '';
            }
            
            if(!lang){
                value = objLabel['th'];
            }else{
                
                value = objLabel[lang.toLocaleLowerCase()];
        
            }
        }
        return value || '';
    }
    
} 