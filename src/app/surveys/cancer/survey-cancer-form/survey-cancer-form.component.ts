import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-survey-cancer-form',
  templateUrl: './survey-cancer-form.component.html',
  styleUrls: ['./survey-cancer-form.component.css']
})
export class SurveyCancerFormComponent implements OnInit {

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
