import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelStored } from './label.stored'
declare var $: any;
export class LabelManager implements OnInit{
    public label = new LabelStored();
    public labels: JSON;
    constructor(){
        this.labels = this.label.labels;
    }
    ngOnInit(){
        
    }
    setupLabel(){

        var objLabels = this.labels;
        var $labels = $('[fs-label]');
        $.each($labels, function(){
            var fsLBL = $(this).attr('fs-label');
            var fsLang = $(this).attr('fs-lang');
            if(!fsLang || fsLang.length<=0){
                fsLang = 'th';
            }else if(fsLang!='th' || fsLang!='en'){
                fsLang = 'th';
            }
            var fsLabelValue = '';
            if(objLabels[fsLBL]){
               fsLabelValue = objLabels[fsLBL][fsLang];
            }
            if(fsLabelValue && $.trim(fsLabelValue).length>0){
                $(this).text(fsLabelValue);
            }
            
        });
    }
}
