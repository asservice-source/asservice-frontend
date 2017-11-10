import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import { LocalDataSource } from 'ng2-smart-table';
import { Utils, Action, SurveyHeaderTypeCode} from "./utils.util";
import * as myconf from "./global-config";
import * as moment from 'moment'
import { IMyDpOptions } from 'mydatepicker';
declare var $: any;
declare var bootbox: any;

export class BaseComponent implements OnInit {
    public labelManager = new LabelManager();
    public _GLOBAL = myconf;
    public ass_action = Action;
    public surveyHeaderCode = SurveyHeaderTypeCode;
    private ng2STDataSource: LocalDataSource;// = new LocalDataSource();
    constructor() {

    }
    ngOnInit() {

    }
    public setNg2STDatasource(data: LocalDataSource) {
        this.ng2STDataSource = data;
    }
    public ng2STDatasource(datas: any): LocalDataSource {
        this.ng2STDataSource = new LocalDataSource(datas);
        return this.ng2STDataSource;
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
    public getUserFullname() {
        return "อิฐิ กรณ์";
    }
    public getTableSetting(columns: any) {
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
        let source = event.source
        if (source) {
            
            source.getElements().then(list => {
                let page = source.getPaging();
                let startSeq = page.page > 1 ? ((page.perPage * page.page) - page.perPage) + 1 : 1;
                for (let item of list) {
                    item.squenceNo = '<div class="text-center">' + (startSeq++) + '</div>';
                }
                source.refresh();
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
        return moment().diff(birthDate, 'years', false);
    }
    public isEmpty(value: string): boolean {
        if (value) {
            if (value.trim().length > 0) {
                return false;
            }
        }
        return true;
    }

    isEmailFormat(email: string): boolean {
        if (email) {
            let result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return result.test(email);
        }
        return false;

    }

    strNullToEmpty(obj: any): any {
        for (var key in obj) {
            if (obj[key] == null || obj[key] == undefined) {
                obj[key] = '';
            }
        }
        return obj;
    }

    public datePickerOptions: IMyDpOptions = {

        dateFormat: 'dd/mm/yyyy',
        dayLabels: { su: 'อา', mo: 'จ', tu: 'อ', we: 'พ', th: 'พฤ', fr: 'ศ', sa: 'ส' },
        monthLabels: { 1: 'ม.ค.', 2: 'ก.พ.', 3: 'มี.ค', 4: 'เม.ย.', 5: 'พ.ค.', 6: 'มิ.ย.', 7: 'ก.ค.', 8: 'ส.ค.', 9: 'ก.ย.', 10: 'ต.ค.', 11: 'พ.ย.', 12: 'ธ.ค.' },
        todayBtnTxt: 'วันนี้',
        sunHighlight: true,
        satHighlight: true,
        showClearDateBtn: false,
        height: '30px',
        editableDateField: false,
        openSelectorOnInputClick: true
    };
    public getCurrentDatePickerModel(strDate?: string): any {
        if (strDate) {
            let arr = strDate.split('-');
            return { date: { year: +arr[0], month: +arr[1], day: +arr[2] } };
        } else {
            let dateObj = new Date();
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            return { date: { year: year, month: month, day: day } };
        }
    }
    public getStringDateForDatePickerModel(date: any): string {
        if (date) {
            return date.year + '-' + this.month2(date.month) + '-' + this.month2(date.day);
        }
        return undefined;
    }
    public month2(m: number): string {
        if (m < 10) {
            return 0 + '' + m;
        }
        return '' + m;
    }
    public clearInputErrorClass(){
        $('label.error').hide();
        $('.error-input').removeClass('error-input');
    }

    public cloneObj(source: any): any{
        let destination:any = {};
        for (var field in source) {
            if('squenceNo'==field)continue;
            destination[field] = source[field];
        }

        return destination;
    }
}