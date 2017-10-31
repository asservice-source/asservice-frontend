import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import { LocalDataSource } from 'ng2-smart-table';
import { Utils, Action } from "./utils.util";
import * as myconf from "./global-config";
import * as moment from 'moment'
import {IMyDpOptions} from 'mydatepicker';
declare var $: any;
declare var bootbox: any;

export class BaseComponent implements OnInit {
    public labelManager = new LabelManager();
    public _GLOBAL = myconf;
    public ass_action = Action;
    private ng2STDataSource: LocalDataSource;// = new LocalDataSource();
    constructor() {

    }
    ngOnInit() {

    }
    public setNg2STDatasource(data: LocalDataSource) {
        this.ng2STDataSource = data;
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
    public getTabelSetting(columns: any) {
        var settings: any = {
            mode: 'external',
            attr: {
                class: 'table table-striped table-bordered'
            },
            actions: {
                add: false,
                edit: false,
                delete: false,
            },
            hideSubHeader: true,
            pager: {
                display: true,
                perPage: 4
            }
        };
        
        settings.columns = {};
        settings.columns.squenceNo = {
            title: 'ลำดับ',
            filter: false,
            sort: false,
            width: '60px',
            type: 'html'
        }
        for (var obj in columns) {
            settings.columns[obj] = columns[obj];
        }
        return settings;
    }
    private isRefrestData = false;
    public onRowSelect(event): void {
        if (this.isRefrestData) {
            this.isRefrestData = false;
            return;
        }
        if (this.ng2STDataSource) {
            this.ng2STDataSource.getElements().then(list => {
                let page = this.ng2STDataSource.getPaging();
                let startSeq = page.page > 1 ? ((page.perPage * page.page) - page.perPage) + 1 : 1;
                for (let item of list) {
                    item.squenceNo = '<div class="text-center">' + (startSeq++) + '</div>';
                }
                this.ng2STDataSource.refresh();
                this.isRefrestData = true;
            });
        }
    }
    public getFullName(prefix: string, firstName, lastname) {
        if (prefix && prefix.trim()) {
            return prefix + "" + firstName + " " + lastname;
        }
        return firstName + " " + lastname;
    }
    public displayFormatDate(dateString: string) {
        return moment(dateString).format('DD/MM/YYYY');
    }
    public getAge(birthDate: string) {
        return moment().diff(birthDate, 'years',false);
    }
    public isEmpty(value: string): boolean{
        if(value){
            if(value.trim().length>0){
                return false;
            }
        }
        return true;
    }

    isEmailFormat(email:string):boolean {
        if(email){
            let result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return result.test(email);
        }
        return false;
        
    }

    strNullToEmpty(obj: any): any{
        for (var key in obj) {
            if(obj[key] == null || obj[key] == undefined){
                obj[key] = '';
            }
        }
        return obj;
    }

    public datePickerOptions: IMyDpOptions = {

        dateFormat: 'dd/mm/yyyy',
    };
    public getCurrentDatePickerModel(): any{
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return { date: { year: year, month: month, day: day} };
    }
   /*
    public month2(m:number):string{
        if(m<10){
            return 0+''+(m+1);
        }else if(m==12){
            return '12';
        }
        return ''+m;
    }
    */
}