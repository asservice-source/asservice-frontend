import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { MosquitoBean } from '../../../beans/mosquito.bean';

declare var $: any;
@Component({
  selector: 'app-survey-mosquito-form',
  templateUrl: './survey-mosquito-form.component.html',
  styleUrls: ['./survey-mosquito-form.component.css']
})
export class SurveyMosquitoFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: MosquitoBean;

  public isFindHome: boolean = true;
  public isShowForm: boolean = false;
  public resetFind: number = 1;

  public mosquitobean : MosquitoBean;

  ngAfterViewInit(): void {
   
  }

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.mosquitobean = new MosquitoBean();
   }

  ngOnInit() {
    this.onModalEvent();
  }

  onBack() {
    this.mosquitobean = new MosquitoBean();
    this.isFindHome = true;
    this.isShowForm = false;
    if (this.ass_action.EDIT == this.action) {
      $('#find-person-md').modal('hide');
    }
  }

  onChoosePlace(bean: any): void {
    //console.log(bean);
    this.mosquitobean = bean;
    this.isFindHome = false;
    this.isShowForm = true;

  }

  onModalEvent() {
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePlace(self.data);
      }
      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindHome = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
  }

}
