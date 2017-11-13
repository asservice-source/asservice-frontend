import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { PersonBean } from '../../../beans/person.bean';
import { PregnantBean } from '../../../beans/pregnant.bean'
import { BaseComponent } from '../../../base-component';

@Component({
  selector: 'app-survey-pregnant-form',
  templateUrl: './survey-pregnant-form.component.html',
  styleUrls: ['./survey-pregnant-form.component.css']
})
export class SurveyPregnantFormComponent extends BaseComponent implements OnInit ,AfterViewInit {

  @Input() action: string;
  @Input() data: PregnantBean;

  
  ngAfterViewInit(): void {
    
  }
  mStatusNo = 0;

  isDisable = false;
  isDisableBirth = true;
  isDisableAbort = true;
  public pregnantType: number = 0;
  public bornType: number = 0;
  public pregnantbean : PregnantBean;
  public resetFind: number = 1;

  public isFindPersonal: boolean = true;
  public personBean = new PersonBean();
  public isShowForm: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) { 
    super();
    this.pregnantbean = new PregnantBean();
  }

  ngOnInit() {
    this.onModalEvent();
  }
  changStatusNo() {
    if (this.mStatusNo > 0) {
      if (this.mStatusNo == 1) {
        this.isDisable = true;
        this.isDisableBirth = false;
        this.isDisableAbort = true;
      } else {
        this.isDisable = true;
        this.isDisableBirth = true;
        this.isDisableAbort = false;
      }
    } else {
      this.isDisableBirth = true;
      this.isDisable = false;
      this.isDisableAbort = true;
    }

  }

  onModalEvent() {
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePersonal(self.data);
      }

      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
  }

  onChoosePersonal(bean: any): void {
    this.pregnantbean = bean;

    this.isFindPersonal = false;
    this.isShowForm = true;
  }
  onBack() {
    this.isFindPersonal = true;
    this.isShowForm = false;
  }

}
