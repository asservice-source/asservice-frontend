import { Component, OnInit, Input } from '@angular/core';
import { CancerBean } from '../../../beans/cancer.bean';

@Component({
  selector: 'app-survey-cancer-form',
  templateUrl: './survey-cancer-form.component.html',
  styleUrls: ['./survey-cancer-form.component.css']
})
export class SurveyCancerFormComponent implements OnInit {

  @Input() set triggerCancer(paramCancer: CancerBean) {
    // this.showModal(paramsPerson);
  }

  constructor() {

  }

  ngOnInit() {

  }

  showModal() {
    let self = this;
  }

}
