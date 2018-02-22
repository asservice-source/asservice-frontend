import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { PregnantBean } from '../../../beans/pregnant.bean';
import { PregnantChildBean } from '../../../beans/pregnant-child.bean';
import { LocalDataSource } from 'ng2-smart-table';
declare var $;

@Component({
  selector: 'app-survey-pregnant-history',
  templateUrl: './survey-pregnant-history.component.html',
  styleUrls: ['./survey-pregnant-history.component.css']
})
export class SurveyPregnantHistoryComponent extends BaseComponent implements OnInit {

  @Input() data: PregnantBean;

  public surveyTypePregnant: string = "Pregnant";
  public surveyTypeBorn: string = "Born";
  public bornTypeAbort: string = "4";

  public pregnantBean: PregnantBean;

  public settings: any;
  public source: LocalDataSource;

  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.pregnantBean = new PregnantBean();

    self.settingsColumns();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
  }

  onModalEvent() {
    let self = this;

    $('#modal-history-pregnant').on('show.bs.modal', function (e) {
      self.pregnantBean = self.data;
      self.bindChildList(self.pregnantBean.childs);
      self.changeRef.detectChanges();
    });

    $('#modal-history-pregnant').on('hidden.bs.modal', function () {

    });
  }

  bindChildList(list) {
    let self = this;

    self.source = self.ng2STDatasource(list);
  }

  settingsColumns() {
    let self = this;

    self.settings = self.getTableSetting({
      firstName: {
        title: 'ชื่อ',
        width: '70px',
        filter: false,
      },
      lastName: {
        title: 'นามสกุล',
        width: '70px',
        filter: false,
      },
      bornCitizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatCitizenId(cell) + '</div>'
        }
      },
      genderName: {
        title: 'เพศ',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      bloodTypeName: {
        title: 'กรุ๊ปเลือด',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      weight: {
        title: 'น้ำหนัก (กรัม)',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatNumber(cell) + '</div>'
        }
      }
    });
  }

}
