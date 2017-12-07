import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { PersonBean } from '../../../beans/person.bean';
import { PregnantBean } from '../../../beans/pregnant.bean'
import { BaseComponent } from '../../../base-component';

@Component({
  selector: 'app-survey-pregnant-form',
  templateUrl: './survey-pregnant-form.component.html',
  styleUrls: ['./survey-pregnant-form.component.css']
})
export class SurveyPregnantFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: PregnantBean;

  mStatusNo = 0;

  isDisable = false;
  isDisableBirth = true;
  isDisableAbort = true;

  public personBean = new PersonBean();
  public pregnantBean: PregnantBean;

  public pregnantType: number = 0;
  public bornType: number = 0;
  public resetFind: number = 1;

  public isFindPersonal: boolean = true;
  public isShowForm: boolean = false;
  public isDisplayPregnantType: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.pregnantBean = new PregnantBean();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
  }

  ngAfterViewInit(): void {

  }

  changStatusNo() {
    let self = this;

    if (self.mStatusNo > 0) {
      if (self.mStatusNo == 1) {
        self.isDisable = true;
        self.isDisableBirth = false;
        self.isDisableAbort = true;
      } else {
        self.isDisable = true;
        self.isDisableBirth = true;
        self.isDisableAbort = false;
      }
    } else {
      self.isDisableBirth = true;
      self.isDisable = false;
      self.isDisableAbort = true;
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
    let self = this;

    self.pregnantBean = bean;

    self.isFindPersonal = false;
    self.isShowForm = true;
  }

  onClickBack() {
    let self = this;

    self.isFindPersonal = true;
    self.isShowForm = false;
  }

  onChangePregnantType() {
    let self = this;

    if (self.pregnantType == 1) {
      self.isDisplayPregnantType = true;
    } else {
      self.isDisplayPregnantType = false;
    }
  }

}
