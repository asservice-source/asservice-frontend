import { Component, OnInit ,AfterViewInit, ElementRef, ChangeDetectorRef, Input} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
import { DiedBean } from '../../../beans/died.bean';
declare var $: any;
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit ,AfterViewInit {
  @Input() action: string;
  @Input() data: DiedBean;
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public resetFind: number = 1;
  public diedBean: DiedBean;
  //show = false;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.diedBean = new DiedBean();
    this.diedBean.causeCode = '-1';
   }

  ngOnInit() {
    
    this.onModalEvent();
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });
  }

  ngAfterViewInit(){
    
  }
  onChangeCause(){
    
  }
  onChangePlace(){
    
  }

  onChoosePersonal(bean:any):void {
    console.log('== noti Choose ==');
    console.log(this.action);
    console.log(bean);
    console.log('== == ==');

    if(this.ass_action.ADD==this.action){
      this.diedBean.citizenId = bean.citizenId;
      this.diedBean.fullName = this.getFullName(bean.person.prefix.name, bean.person.firstName, bean.person.lastName);
      this.diedBean.birthDate = bean.person.birthDate
      this.diedBean.age = this.getAge(bean.person.birthDate);
    }else if(this.ass_action.EDIT==this.action){
      this.diedBean = bean;
    }
    
    this.isFindPersonal = false;
    this.isShowForm = true;
  }
  onBack(){
    this.diedBean = new DiedBean();
    this.isFindPersonal = true;
    this.isShowForm = false;
    if(this.ass_action.EDIT == this.action){
      $('#modal-add-died').modal('hide');
    }
  }
  onModalEvent(){
    let self = this;
    $('#modal-add-died').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind+1;
      if(self.action==self.ass_action.EDIT){
        self.onChoosePersonal(self.data);
      }

      self.changeRef.detectChanges();
    })
    $('#modal-add-died').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind+1;
      self.changeRef.detectChanges();
    });
  }
}