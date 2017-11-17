import { Component, OnInit, ElementRef, ChangeDetectorRef, Input, AfterViewInit} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
import { DeadBean } from '../../../beans/dead.bean';
import {IMyDpOptions} from 'mydatepicker';
import { Service_SurveyDead } from '../../../service/service-survey-dead';
declare var $: any;
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css','../../../checkbox.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit ,AfterViewInit{
  @Input() action: string;
  @Input() data: DeadBean;
  public bean: DeadBean;
  public apiDead : Service_SurveyDead;
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public resetFind: number = 1;
  public isCauseOther: boolean = false;
  public cancerList: Array<any>;
  public deadPlaceList: Array<any>;
  public timeMimute = Array.from(Array(24),(x,i)=>i);
  public timeSec = Array.from(Array(60),(x,i)=>i);
  public mDateDead: any;
  public mMinutes: string;
  public mSeconds: string;
  public loading: boolean = true;

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new DeadBean();
    this.apiDead = new Service_SurveyDead();
    this.cancerList = new Array<any>();
    this.deadPlaceList = new Array<any>();
   }

  ngOnInit() {
    this.onModalEvent();
    this.setupCancerList();
    this.setupPlaceList();
  }

  ngAfterViewInit(){
    this.setCalendarThai();
  }

  

  setupCancerList(){
    let _self = this;
    this.apiDead.apiHTTPService.api_CancerList(function(response){
      _self.cancerList = response;
    });
  }

  setupPlaceList(){
    let _self = this;
    this.apiDead.apiHTTPService.api_DeathPlaceList(function(response){
      _self.deadPlaceList = response;
    });
  }
  onChoosePersonal(bean: DeadBean):void {
    
    this.bean = bean;
    if(!this.bean.deathPlaceCode){
      this.bean.deathPlaceCode = "9";
    }
    if(this.action==this.ass_action.EDIT){
      let dateObj = this.convertDateTimeSQL_to_DisplayDateTime(this.bean.deathDate);
      this.mDateDead = this.getCurrentDatePickerModel(this.bean.deathDate);
      this.mMinutes = dateObj.time.minutes;
      this.mSeconds = dateObj.time.seconds;

    }
    this.isFindPersonal = false;
    this.isShowForm = true;
    console.log(">>> Choose Person");
    console.log(this.bean);
  }
  onBack(){
    this.bean = new DeadBean();
    this.isFindPersonal = true;
    this.isShowForm = false;
    if(this.ass_action.EDIT == this.action){
      $('#modal-add-died').modal('hide');
    }
  }
  onDateChanged(event: any){
    console.log(event);
    this.mDateDead = event;
  }
  onModalEvent(){
    let _self = this;
    $('#modal-add-died').on('show.bs.modal', function (e) {
      
      _self.resetFind = _self.resetFind+1;
      if(_self.action==_self.ass_action.EDIT){
        if(!_self.isEmpty(_self.data.causeOther)){
          _self.isCauseOther = true;
        }else{
          _self.isCauseOther = false;
        }
        _self.onChoosePersonal(_self.data);
       
      }
      _self.changeRef.detectChanges();
    })
    $('#modal-add-died').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      _self.isShowForm = false;
      _self.isFindPersonal = true;
      _self.resetFind = _self.resetFind+1;
      _self.changeRef.detectChanges();
    });
  }

  onSave(){
    console.log("Saving");
    console.log(this.bean);
    let date = this.mDateDead.date;    
    this.bean.deathDate = (date.year+'-'+date.month+'-'+date.day)+' '+this.mMinutes+':'+this.mSeconds+':00.0';
    console.log(this.strNullToEmpty(this.apiDead.map(this.bean)));
    let _self = this;
    // _self.apiDead.commit_save(_self.bean, function(response){

    // });
  }


  setCalendarThai(){

    $('body').on('click','.inputnoteditable', function(){
      console.log($(this).val());
      let year = +($('button.yearlabel').first().text());
      let thaiYear = year+543;
      $('button.yearlabel').first().text(thaiYear);
      console.log(thaiYear);
    });
    $('body').on('click','button.btnpicker', function(){
      let year = +($('button.yearlabel').first().text());
      let thaiYear = year+543;
      $('button.yearlabel').first().text(thaiYear);
      console.log(thaiYear);

    });
    $('body').on('click','button[aria-label="Next Year"]', function(){
      console.log($(this).val());
      let thaiYear = +($('button.yearlabel').first().text());
      thaiYear += 1;
      $('button.yearlabel').first().text(thaiYear);
      console.log(thaiYear);
    });
    $('body').on('click','button[aria-label="Previous Year"]', function(){
      console.log($(this).val());
      let thaiYear = +($('button.yearlabel').first().text());
      thaiYear -= 1;
      $('button.yearlabel').first().text(thaiYear);
      console.log(thaiYear);
    });

    // $('body').on('click','button.yearlabel', function(){
    //   console.log('CLICK');
    //   $.each($(".yearvalue"), function(){
    //     let year = +($(this).text());
    //     let yearThai = year+543;
    //     $(this).text(yearThai);
    //   });
    // });

  
  }
}