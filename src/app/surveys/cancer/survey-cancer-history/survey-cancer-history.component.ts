import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-cancer-history',
  templateUrl: './survey-cancer-history.component.html',
  styleUrls: ['./survey-cancer-history.component.css']
})
export class SurveyCancerHistoryComponent extends BaseComponent implements OnInit {

  public loading: boolean = false;

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
