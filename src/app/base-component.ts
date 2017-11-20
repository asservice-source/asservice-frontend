import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import { LocalDataSource } from 'ng2-smart-table';
import { Utils, Action, SurveyHeaderTypeCode } from "./utils.util";
import * as myconf from "./global-config";
import * as moment from 'moment'
import { IMyDpOptions } from 'mydatepicker';
import { ANIMATION_TYPES } from './ng2-loading/ass-loading.config';
import { ApiHTTPService } from './service/api-http.service';
declare var $: any;
declare var bootbox: any;

export class BaseComponent implements OnInit {
    public labelManager:LabelManager;
    public _GLOBAL = myconf;
    public ass_action = Action;
    public surveyHeaderCode = SurveyHeaderTypeCode;
    public loading: boolean = false;
    private ng2STDataSource: LocalDataSource;// = new LocalDataSource();
    public rowPerPage: number = 10;

    
    constructor() {

        this.labelManager = new LabelManager();
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
                perPage: this.rowPerPage
            }
        };

        settings.columns = {};
        settings.columns.sequenceNo = {
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
                    item.sequenceNo = '<div class="text-center">' + (startSeq++) + '</div>';
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
                obj[key] = "";
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
            let arrDT = strDate.split(' ');
            let arrD = [];
            if(arrDT[0].length>=8){
                arrD = arrDT[0].split('-');
            }else{
                arrD = strDate[0].split('-');
            }
            return { date: { year: +arrD[0], month: +arrD[1], day: +arrD[2] } };
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
            return date.year + '-' + this.numberAppendPrefix(date.month,2) + '-' + this.numberAppendPrefix(date.day, 2);
        }
        return undefined;
    }

    public convertDateTimeSQL_to_DisplayDateTime(strDate?: string): any {
        let dateTimeObject: any = {date:"", time:{minutes:"00", seconds:"00"}};
        if (strDate) {
            let arrDT = strDate.split(" ");
            let arrD = arrDT[0].split('-');
            let arrT = arrDT[1].split(':');
            dateTimeObject.date =  arrD[2] +"/"+arrD[1]+"/"+arrD[0];
            dateTimeObject.time.hours=arrT[0];
            dateTimeObject.time.minutes=arrT[1];
        } else {
            // let dateObj = new Date();
            // let month = dateObj.getUTCMonth() + 1; //months from 1-12
            // let day = dateObj.getUTCDate();
            // let year = dateObj.getUTCFullYear();
            
        }

        return dateTimeObject;

    }
    public clearInputErrorClass() {
        $('label.error').hide();
        $('.error-input').removeClass('error-input');
    }

    public cloneObj(source: any): any {
        let destination: any = {};
        for (var field in source) {
            if ('sequenceNo' == field) continue;
            destination[field] = source[field];
        }

        return destination;
    }
    formatCitizenId(cid:string): string{
        if(this.isEmpty(cid) && cid.length==13) return cid;
        let arr = cid.split('');
        return arr[0]+'-'+arr[1]+arr[2]+arr[3]+arr[4]+'-'+arr[5]+arr[6]+arr[7]+arr[8]+arr[9]+'-'+arr[10]+arr[11]+'-'+arr[12];
    }
    isValidCitizenIdThailand(s): boolean {
        let pin = 0, j = 13, pin_num = 0;
        if (s == "") {
            return;
        }

        let ChkPinID = true;
        if (ChkPinID = false) { 
            return false; 
        }

        if (s.length == 13) {
            for (let i = 0; i < s.length; i++) {
                if (i != 12) {
                    pin = s.charAt(i) * j + pin;
                }
                j--;
            }
            pin_num = (11 - (pin % 11)) % 10;
            if (s.charAt(12) != pin_num) {
                // alert("เลขที่บัตรประจำตัวประชาชนไม่ถูกต้อง กรุณาป้อนเลขที่บัตรประจำตัวประชาชนอีกครั้ง");
                return false;
            }
        } else {
            // alert("เลขที่บัตรประจำตัวประชาชนไม่ถูกต้อง กรุณาป้อนเลขที่บัตรประจำตัวประชาชนอีกครั้ง");
            return false;
        }

        return true;
    }

    numberAppendPrefix(number:number, max?:number): string{
        let strResult: string = ""+number;
        if(max){
            let prefix = "";
            let length = (""+number).length;
            let ans = (max-length)
            if(ans>0){
                for(let i=0; i<ans; i++){
                    prefix+="0";
                }
                strResult = prefix+""+number;
            }
        }
        return strResult;
    }

    loadingConfig(): any{
        return {fullScreenBackdrop: true, animationType: ANIMATION_TYPES.rotatingPlane}
    }

    message_success(title: string, message: string, callback?: (doc: any) => void){
        title = title || 'ทำรายการสำเร็จ';
        bootbox.alert({
            size: "large",
            title: "<div class='bootbox-title'><span class='fa fa-check' style='color: #14b713;'></span> "+title+"</div>",
            message: message,
            callback: callback
        });
    }
    
    message_error(title: string, message: string, callback?: (doc: any) => void){
        title = title || 'ไม่สามารถทำรายการได้';
        bootbox.alert({
            size: "large",
            title: "<div class='bootbox-title'><span class='fa fa-close' style='color: #d02626;'></span> "+title+"</div>",
            message: message,
            callback: callback
        });
    }
    message_comfirm(title: string, message: string, callback?: (doc: any) => void){
        title = title || 'ยืนยันการทำรายการ';
        bootbox.confirm({
            size: "large",
            title: "<div class='bootbox-title'><span class='fa fa-question' style='color: #2a7ec7;'></span> "+title+"</div>",
            message: message,
            callback: callback
        });
    }
}