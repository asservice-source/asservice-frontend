import { Component, OnInit ,AfterViewInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
import { DiedBean } from '../../../beans/died.bean';
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit ,AfterViewInit {
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public resetFind: number = 1;
  public personBean: PersonBean;
  public diedBean: DiedBean;
  //show = false;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.diedBean = new DiedBean();
    this.personBean = new PersonBean();

    this.diedBean.causeDied = '-1';


   }
  persons = [];

  ngOnInit() {
    
    this.onModalEvent();
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });

    $("#textLocation").hide();
    $("#textCause").hide();

    $("#textLocation2").hide();
    $("#textCause2").hide();
    
    this.persons = [{
      CitizenID: "5470900018746"
    , LastName:"สมนึก"
    , FirstName: "จิตใจดี"
    , NickName:"So"
    , Gender: "ชาย"
    , Prefix: "นาย"
    , BirthDate: "01/02/2536"}];
  }

  ngAfterViewInit(){
    let person;
    $('#find-dropdownPerson').on('change', function(){
        if($(this).val()>=1){
          $('#personDetail').removeAttr('hidden');
        }else{
          $('#personDetail').attr('hidden','true');
        }
    });
  }
  onChangeCause(){
    
  }
  onChangeLocation(){
    
  }

  onChoosePersonal(personBean:PersonBean):void {
    this.personBean = personBean;
    console.log('noti Choose = '+personBean.citizenId);
    this.isFindPersonal = false;
    this.isShowForm = true;
  }
  onBack(){
    this.personBean = new PersonBean();
    this.isFindPersonal = true;
    this.isShowForm = false;
  }
  onModalEvent(){
    let self = this;
    $('#modal-add-died').on('show.bs.modal', function (e) {
      console.log("show.bs.modal");
      self.resetFind = self.resetFind+1;
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