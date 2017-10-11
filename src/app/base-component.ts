import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import * as myconf from "./global-config";
declare var $: any;
declare var bootbox:any;
export class BaseComponent implements OnInit {
    public labelManager = new LabelManager();
    public _GLOBAL = myconf;
    constructor() {

    }
    ngOnInit() {
    }
    public getLabel(key: string, lang?: string, defaultValue?: string) {
        ///console.log("label:"+key);
        return this.labelManager.getLabel(key, lang) || defaultValue;
    }
    public getApiUrl(urlAPI: string) {
        return this._GLOBAL.API_SERVER_URL + urlAPI;
    }
    public getHospitalCode() {
        return "04269";
    }
    public getTabelSetting(columns:any){
        var settings: any = {
            mode:'inline',
            attr:{
              class: "table table-striped table-bordered"
            },
            actions:{
              add: false,
              edit: false,
              delete: false,
            },
            hideSubHeader: true,
            pager:{
              display: true,
              perPage: 4
            }
          };

          settings.columns = columns;

          

          return settings;
    }
}