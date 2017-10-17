import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-survey-cancer-modal',
  templateUrl: './survey-cancer-modal.component.html',
  styleUrls: ['./survey-cancer-modal.component.css']
})
export class SurveyCancerModalComponent implements OnInit {

  @Input() set triggerCancer(test: string) {
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
