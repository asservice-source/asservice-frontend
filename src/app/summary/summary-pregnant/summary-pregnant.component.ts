import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-summary-pregnant',
  templateUrl: './summary-pregnant.component.html',
  styleUrls: ['./summary-pregnant.component.css']
})
export class SummaryPregnantComponent extends BaseComponent implements OnInit {
  public subfixPath: string = 'pregnancy/ViewMonthlyReport';
  public report: string = this.surveyHeaderCode.PREGNANT;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
  }
  ngOnInit() {
    this.changeRef.detectChanges();
  }

}
