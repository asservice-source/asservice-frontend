import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { MetabolicBean } from '../../../beans/metabolic.bean';
declare var $;

@Component({
  selector: 'app-survey-metabolic-history',
  templateUrl: './survey-metabolic-history.component.html',
  styleUrls: ['./survey-metabolic-history.component.css']
})
export class SurveyMetabolicHistoryComponent extends BaseComponent implements OnInit {

  @Input() data: MetabolicBean;

  public metabolicbean: MetabolicBean;

  constructor(private changeRef: ChangeDetectorRef) { 
    super();

    let self = this;

    self.metabolicbean = new MetabolicBean();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
  }

  onModalEvent() {
    let self = this;

    $('#modal-history-metabolic').on('show.bs.modal', function (e) {
      self.metabolicbean = self.data;
      self.changeRef.detectChanges();
    });

    $('#modal-history-metabolic').on('hidden.bs.modal', function () {

    });
  }

}
