import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActivatedRoute } from '@angular/router';
import { CancerBean } from '../../../beans/cancer.bean';
declare var $;

@Component({
  selector: 'app-survey-cancer-history',
  templateUrl: './survey-cancer-history.component.html',
  styleUrls: ['./survey-cancer-history.component.css']
})
export class SurveyCancerHistoryComponent extends BaseComponent implements OnInit {

  @Input() data: CancerBean;

  public cancerBean: CancerBean;

  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.cancerBean = new CancerBean();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
  }

  onModalEvent() {
    let self = this;

    $('#modal-cancer-history').on('show.bs.modal', function (e) {
      self.cancerBean = self.data;
      self.changeRef.detectChanges();
    });

    $('#modal-cancer-history').on('hidden.bs.modal', function () {

    });
  }

}
