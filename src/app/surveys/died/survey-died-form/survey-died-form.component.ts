import { Component, OnInit, ElementRef, ChangeDetectorRef, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
import { DeadBean } from '../../../beans/dead.bean';
import {IMyDpOptions} from 'mydatepicker';
import { Service_SurveyDead } from '../../../service/service-survey-dead';
declare var $: any;
declare var bootbox: any;
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css','../../../checkbox.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit ,AfterViewInit{
  @Input() action: string;
  @Input() data: DeadBean;
  @Input() currentDocumentId: string;
  @Output() commit: EventEmitter<any>;
  public bean: DeadBean;
  public apiDead : Service_SurveyDead;
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public resetFind: number = 1;
  public cancerList: Array<any>;
  public deadPlaceList: Array<any>;
  public timeHours = Array.from(Array(24),(x,i)=>i);
  public timeMins = Array.from(Array(60),(x,i)=>i);


  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.commit = new EventEmitter<any>();
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
    this.apiDead.api_CancerList(function(response){
      _self.cancerList = response;
    });
  }

  setupPlaceList(){
    let _self = this;
    this.apiDead.api_DeathPlaceList(function(response){
      _self.deadPlaceList = response;
    });
  }
  onChoosePersonal(mBean: DeadBean):void {
    this.bean = mBean;
    if(this.action==this.ass_action.EDIT){
      let dateObj = this.convertDateTimeSQL_to_DisplayDateTime(this.bean.deathDate);
      this.bean.mDateDead = this.getCurrentDatePickerModel(this.bean.deathDate);
      this.bean.mHours = dateObj.time.hours;
      this.bean.mMins = dateObj.time.minutes;
      if(this.bean.causeOther && !this.isEmpty(this.bean.causeOther)){
        this.bean.isCauseOther = true;
      }else{
        this.bean.isCauseOther = false;
      }
      
    }else{
      this.bean.cancerTypeID = 0;
      this.bean.deathPlaceCode = "";
      this.bean.mHours = '00';
      this.bean.mMins = '00';
    }
    this.isFindPersonal = false;
    this.isShowForm = true;
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
    this.bean.mDateDead = event;
  }
  onModalEvent(){
    let _self = this;
    $('#modal-add-died').on('show.bs.modal', function (e) {
      _self.resetFind = _self.resetFind+1;
      if(_self.action==_self.ass_action.EDIT){
        _self.onChoosePersonal(_self.data);
      }
      _self.changeRef.detectChanges();
    })
    $('#modal-add-died').on('hidden.bs.modal', function () {
      
      _self.isShowForm = false;
      _self.isFindPersonal = true;
      _self.resetFind = _self.resetFind+1;
      _self.changeRef.detectChanges();
    });
  }

  onSave(){
    
    let date = this.bean.mDateDead.date;    
    this.bean.deathDate = (date.year+'-'+date.month+'-'+date.day)+' '+this.bean.mHours+':'+this.bean.mMins+':00.0';
    if(this.action==this.ass_action.ADD){
      this.bean.documentId = this.currentDocumentId;
    }
    let _self = this;
    _self.loading = true;
   _self.apiDead.commit_save(this.bean,
    function(response){
        _self.loading = false;
        if(response.status.toUpperCase()=="SUCCESS"){
          $('#modal-add-died').modal('hide');
          _self.message_success('','แจ้งการเสียชีวิต : '+_self.bean.fullName, function(){
            _self.commit.emit(response);
          });

         
        }else{
          let msg = response.message;
          if(response.message.indexOf('Duplicated')>=0){
            msg = 'ทำรายการซ้ำ : '+_self.bean.fullName + ' มีการแจ้งเสียชีวิตไปแล้ว';
          }
          _self.message_error('',''+msg, function(){});
        }
        console.log("Saved Response...");
        console.log(response);
      });
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