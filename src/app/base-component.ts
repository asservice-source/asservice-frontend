import { Component, OnInit, OnDestroy, Optional, Inject, Injectable, ChangeDetectorRef } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import { LocalDataSource } from './ng2-smart-table';
import { Utils, Action, SurveyHeaderTypeCode, MessageType } from "./utils.util";
import * as myconf from "./global-config";
import * as moment from 'moment'
import { IMyDpOptions } from 'mydatepicker';
import { ANIMATION_TYPES } from './ng2-loading/ass-loading.config';
import { ApiHTTPService } from './api-managements/api-http.service';
import { UserService } from './service/user.service';
import { AppComponent } from './app.component';
import { MainContentComponent } from './main/main-content/main-content.component';
import { Moment } from 'moment';

declare var $: any;
declare var bootbox: any;
declare var messageBox: any;

@Injectable()
export class BaseComponent implements OnInit {
    public labelManager: LabelManager;
    public _GLOBAL = myconf;
    public ass_action = Action;
    public surveyHeaderCode = SurveyHeaderTypeCode;
    public rowPerPage: number = 10;
    public userInfo: UserService;
    public httpAPI: ApiHTTPService;
    constructor() {
        this.userInfo = AppComponent.injector.get(UserService);
        this.labelManager = new LabelManager();
    }
    ngOnInit() {

    }

    public getLabel(key: string, lang?: string, defaultValue?: string) {

        return this.labelManager.getLabel(key, lang) || defaultValue;
    }

    public getApiUrl(urlAPI: string) {
        return this._GLOBAL.API_SERVER_URL + urlAPI;
    }

    public getUserFullName(): string {

        return this.userInfo.fullName;
    }
    public getHospitalCode(): string {
        //return "04269";
        return this.userInfo.hospitalCode5;
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
            type: 'html',
            class: 'sequenceNo'
        }
        for (var obj in columns) {
            settings.columns[obj] = columns[obj];
        }
        return settings;
    }
    public ng2STDatasource(datas: any): LocalDataSource {
        let source = new LocalDataSource(datas);
        source.getElements().then(list => {
            let num = 0;
            for (let item of list) {
                item.sequenceNumber = num++;
            }
        });
        return source;
    }
    private isRefrestData = false;
    public onRowSelect(event): void {

        if (this.isRefrestData) {
            this.isRefrestData = false;
            return;
        }
        $("#btn-view-child").html("จัดการสมาชิก");
        let source = event.source;
        if (source) {

            source.getElements().then(list => {
                let page = source.getPaging();
                let startSeq = page.page > 1 ? ((page.perPage * page.page) - page.perPage) + 1 : 1;
                let startSeqNo = startSeq;
                let isNoSort = false;
                let num = 0;
                let sequenceNumber = 0;
                for (let item of list) {
                    sequenceNumber = +(item.sequenceNumber);
                    if (sequenceNumber > num && (sequenceNumber - num) == 1) {
                        num = sequenceNumber;
                    } else {
                        isNoSort = true;
                    }
                    item.sequenceNumber = startSeqNo++;
                    item.sequenceNo = '<div class="text-center">' + (item.sequenceNumber) + '</div>';
                }
                if (isNoSort) {
                    source.refresh();
                    this.isRefrestData = true;
                }

            });
        }
    }

    public getFullName(prefix: string, firstName, lastname) {
        if (prefix && prefix.trim()) {
            return prefix + "" + firstName + " " + lastname;
        }
        return firstName + " " + lastname;
    }

    public isMoreThanCurrentDate(dateString: string) {
        let currentDate = moment(moment().format('YYYY-MM-DD'));
        let inpuDate = moment(dateString);
        if (inpuDate > currentDate) {
            return true;
        } else {
            return false;
        }
    }

    public isLessThanCurrentDate(dateString: string) {
        let currentDate = moment(moment().format('YYYY-MM-DD'));
        let inpuDate = moment(dateString);
        if (inpuDate < currentDate) {
            return true;
        } else {
            return false;
        }
    }

    public isMoreThanCurrentDate280Days(dateString: string) {
        let currentDate = moment(moment().format('YYYY-MM-DD'));
        let inpuDate = moment(dateString);
        let diffDays = inpuDate.diff(currentDate, 'days')
        if (diffDays > 280) {
            return true;
        } else {
            return false;
        }
    }

    public isLessThanCurrentEqualsDate(dateString: string) {
        let currentDate = moment(moment().format('YYYY-MM-DD'));
        let inpuDate = moment(dateString);
        if (inpuDate <= currentDate) {
            return true;
        } else {
            return false;
        }
    }

    public displayFormatDate(dateString: string) {
        if (dateString) {
            return moment(dateString).format('DD/MM/YYYY');
        } else {
            return "";
        }
    }
    public displayFormatDate_Thai(dateString: string) {
        if (dateString) {
            let date: Moment = moment(dateString)
            let y = date.year() + 543;
            let strDates = date.format('DD/MM/YYYY').split('/');
            return strDates[0] + '/' + strDates[1] + '/' + y;
        } else {
            return "";
        }
    }

    public displayFormatDateTime(dateString: string) {
        if (dateString) {
            return moment(dateString).format('DD/MM/YYYY HH:mm');
        } else {
            return "";
        }
    }

    public getAge(birthDate: string, format?: string) {
        if (birthDate) {
            let currentDate = moment(moment().format('YYYY-MM-DD'));
            let inpuDate = moment(birthDate);

            if (format == "full") {
                var years = currentDate.diff(inpuDate, 'year');
                inpuDate.add(years, 'years');

                var months = currentDate.diff(inpuDate, 'months');
                inpuDate.add(months, 'months');

                var days = currentDate.diff(inpuDate, 'days');

                return { "years": years, "months": months, "days": days };
            } else {
                return moment().diff(birthDate, 'years', false);
            }
        }
    }

    public isEmpty(value: string): boolean {
        if (value) {
            if (value.toString().trim().length > 0) {
                return false;
            }
        }
        return true;
    }

    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
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

    public getDatePickerModel(strDate?: string): any {
        if (strDate) {
            let arrDT = strDate.split(' ');
            let arrD = [];
            if (arrDT[0].length >= 8) {
                arrD = arrDT[0].split('-');
            } else {
                arrD = strDate[0].split('-');
            }
            return { date: { year: +arrD[0], month: +arrD[1], day: +arrD[2] } };
        } else {
            return null;
        }
    }

    public getCurrentDatePickerString() {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + '-' + month + '-' + day;
    }
    public getCurrentDatePickerModel(strDate?: string): any {
        if (strDate) {
            let arrDT = strDate.split(' ');
            let arrD = [];
            if (arrDT[0].length >= 8) {
                arrD = arrDT[0].split('-');
            } else {
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
            return date.year + '-' + this.numberAppendPrefix(date.month, 2) + '-' + this.numberAppendPrefix(date.day, 2);
        }
        return "";
    }

    public convertDateTimeSQL_to_DisplayDateTime(strDate?: string): any {
        let dateTimeObject: any = { date: "", time: { minutes: "00", seconds: "00" } };
        if (strDate) {
            let arrDT = strDate.split(" ");
            let arrD = arrDT[0].split('-');
            let arrT = arrDT[1].split(':');
            dateTimeObject.date = arrD[2] + "/" + arrD[1] + "/" + arrD[0];
            dateTimeObject.time.hours = arrT[0];
            dateTimeObject.time.minutes = arrT[1];
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

    public copyObj(source: any, destination: any): any {
        for (var field in source) {
            if ('sequenceNo' == field) continue;
            destination[field] = source[field];
        }

        return destination;
    }

    formatCitizenId(cid: string): string {
        if (this.isEmpty(cid) || cid.length != 13) return cid;

        let arr = cid.split('');
        return arr[0] + '-' + arr[1] + arr[2] + arr[3] + arr[4] + '-' + arr[5] + arr[6] + arr[7] + arr[8] + arr[9] + '-' + arr[10] + arr[11] + '-' + arr[12];
    }

    reverseFormatCitizenId(cid: string): string {
        if (this.isEmpty(cid)) {
            return cid;
        }
        return cid.split('-').join('');
    }

    isValidCitizenIdThailand(s): boolean {
        if (this.isEmpty(s)) {
            return false;
        }
        s = s.split('-').join('');
        let pin = 0, j = 13, pin_num = 0;
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

    numberAppendPrefix(number: number, max?: number): string {
        let strResult: string = "" + number;
        if (max) {
            let prefix = "";
            let length = ("" + number).length;
            let ans = (max - length)
            if (ans > 0) {
                for (let i = 0; i < ans; i++) {
                    prefix += "0";
                }
                strResult = prefix + "" + number;
            }
        }
        return strResult;
    }

    loadingConfig(): any {
        return { fullScreenBackdrop: true, animationType: ANIMATION_TYPES.threeBounce }
    }

    message_comfirm(title: string, message: string, callback?: (doc: any) => void) {
        title = title || 'ยืนยันการทำรายการ';
        title = "<div class='bootbox-title'><span class='fa fa-question' style='color: #2a7ec7;'></span> " + title + "</div>";
        messageBox.confirm(title, message, callback);
    }

    message_success(title: string, message: string, callback?: (doc: any) => void) {
        title = title || 'ทำรายการสำเร็จ';
        title = "<div class='bootbox-title'><span class='fa fa-check' style='color: #14b713;'></span> " + title + "</div>"
        messageBox.alert(title, message, callback);
    }

    message_error(title: string, message: string, callback?: (doc: any) => void) {
        title = title || 'ไม่สามารถทำรายการได้';
        title = "<div class='bootbox-title'><span class='fa fa-close' style='color: #d02626;'></span> " + title + "</div>";
        messageBox.alert(title, message, callback);
    }

    message_servNotRespond(title: string, message: string, callback?: (doc: any) => void) {
        title = title || 'Server Not Responding';
        title = "<div class='bootbox-title'><span class='fa fa-close' style='color: #d02626;'></span> " + title + "</div>";
        message = message || 'ไม่สามารถเข้าถึงข้อมูลได้ในขณะนี้';
        messageBox.alert(title, message, callback);
    }

    isOsmRole(roleId: string) {
        if (roleId == '4' || roleId == '5')
            return true;
        else
            return false;
    }

    isStaffRole(roleId: string) {
        if (roleId == '2' || roleId == '3')
            return true;
        else
            return false;
    }

    getYearDiff(year) {
        let currentYear = (new Date()).getFullYear();
        return (currentYear - (+year));
    }

    formatNumber(num) {
        if (num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return "";
        }
    }

    compareDateCurrent_DDMMYYYY(compareDate: any): number {
        let result = -1;
        let strDate = '';
        if (compareDate.date) {
            let date = compareDate.date;
            strDate = date.year + '-' + date.month + '-' + date.day;
            strDate += ' 00:00:00';

        } else if (compareDate && compareDate.length == 10) {
            let dates = compareDate.split('/');
            let year: number;
            if (dates.length == 3) {
                strDate = dates[2] + '-' + dates[1] + '-' + dates[0];
                strDate += ' 00:00:00';
            } else {
                return result;
            }
        } else {
            return result;
        }

        let date = new Date(strDate);
        let cDate = new Date();
        let currentTime = 0;
        let time = 0;
        cDate.setHours(0);
        cDate.setMinutes(0);
        cDate.setSeconds(0);
        cDate.setMilliseconds(0);
        currentTime = cDate.getTime();
        time = date.getTime();
        result = currentTime - time;

        return result;
    }
    private homeTypeCodes: Array<any> = ['01', '02', '03', '04', '05'];
    isHomeType(homeTypeCode: string): boolean {
        if (this.homeTypeCodes.indexOf(homeTypeCode) >= 0) {
            return true;
        }
        return false;
    }

    pastCitizenId(citizenId: any): string{
        if(citizenId){
            citizenId = citizenId.replace(/[^0-9\.]+/g, '');

            if(citizenId.length > 13){
                citizenId = citizenId.substr(0, 13);

            }
            citizenId = this.formatCitizenId(citizenId);
          }
          return citizenId;
    }

    getLocationGooglemaps(address: any, callback: (doc:any)=>void){
      this.httpAPI = new ApiHTTPService();
      if(!address){
        address= this.userInfo.hospitalTumbolName;
        address += ' '+this.userInfo.hospitalAmphurName;
        address += ' '+this.userInfo.hospitalProvinceName;
        address += ' '+this.userInfo.hospitalZipCode;
      }
      let params = {'address': address, 'key': this._GLOBAL.API_MAPS_KEY};

      let url = Object.keys(params).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
      }).join('&');
      console.log('params',params);
      console.log('URL',url);
      this.httpAPI.http.get('https://maps.googleapis.com/maps/api/geocode/json?'+url)
        .map(res => res.json())
        .subscribe(
          data => callback(data),
          err => callback(err),
          () => console.log('Fetching complete for Server Api.')
        )
    }

    public isHomeNo(homeNo):boolean{
        console.log('IsHomeNo', homeNo);
        let test1 = /^[0-9/]{1,10}$/.test(homeNo);
        if(!test1 || homeNo.lastIndexOf('/') == (homeNo.length-1) || homeNo.lastIndexOf('0') == 0){
          return false;
        }
        return true;
    }
}
