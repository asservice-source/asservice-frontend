import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-summary-died',
  templateUrl: './summary-died.component.html',
  styleUrls: ['./summary-died.component.css']
})
export class SummaryDiedComponent extends BaseComponent implements OnInit {
  public subfixPath: string = 'death/ViewMonthlyReport';
  public report: string = this.surveyHeaderCode.DEATH;
  constructor(private changeRef: ChangeDetectorRef) { 
    super();
  }
  ngOnInit() {
    this.changeRef.detectChanges();
  }

}
