import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomSurveyComponent } from '../../../action-custom-table/action-custom-view.component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { LocalDataSource } from '../../../ng2-smart-table';
import { MosquitoBean } from '../../../beans/mosquito.bean';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-survey-mosquito-pending-list',
  templateUrl: './survey-mosquito-pending-list.component.html',
  styleUrls: ['./survey-mosquito-pending-list.component.css']
})
export class SurveyMosquitoPendingListComponent extends BaseComponent implements OnInit {

  public apiHttp: ApiHTTPService = new ApiHTTPService();

  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  public action: string = "";
  public documentId: string = "";
  public roundInfo: any;
  public mosquitoBean: MosquitoBean = new MosquitoBean();
  public loading: boolean = false;
  public placeData: any;

  constructor(private changeRef: ChangeDetectorRef, private route: Router) {
    super();

    let self = this;

    self.settingsTable();
  }

  ngOnInit() {
    let self = this;

    self.loading = true;

    self.loadData();
  }

  settingsTable() {
    let self = this;

    self.settings = self.getTableSetting({
      name: {
        title: 'ชื่อ/บ้านเลขที่',
        filter: false,
        type: 'html'
      },
      address: {
        title: 'ที่อยู่',
        filter: false,
        width: '500px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="wrap-text" title="' + cell + '">' + cell + '</div>'
        }
      },
      homeTypeName: {
        title: 'ประเภท',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      // totalSurvey: {
      //   title: 'จำนวนสำรวจ',
      //   filter: false,
      //   width: '120px',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => {
      //     return '<div class="text-center">' + this.formatNumber(cell) + '</div>'
      //   }
      // },
      // totalDetect: {
      //   title: 'จำนวนพบ',
      //   filter: false,
      //   width: '100px',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => {
      //     return '<div class="text-center">' + this.formatNumber(cell) + '</div>'
      //   }
      // },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyComponent,
        onComponentInitFunction(instance) {

          instance.survey.subscribe((row, cell) => {
            self.action = self.ass_action.ADD;
            self.placeData = self.cloneObj(row);
            self.placeData.osmId = self.userInfo.personId;
            self.changeRef.detectChanges();

            $('#find-person-md').modal('show');

          });

        }
      }
    });
  }

  loadData() {
    let self = this;

    self.loading = true;

    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.MONITORHICI, function (r) {
      if (!self.isEmptyObject(r)) {
        self.documentId = r.rowGUID;

        let params = { "documentId": r.rowGUID, "osmId": self.userInfo.personId };

        self.apiHttp.post('survey_hici/search_hici_info_list_not_survey', params, function (d) {
          self.loading = false;
          if (d != null && d.status.toUpperCase() == "SUCCESS") {
            self.source = self.ng2STDatasource(d.response);
          }
          self.changeRef.detectChanges();

        });
      }
    });
  }

  callbackData(event: any) {
    let self = this;

    if (event) {
      self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจลูกน้ำยุงลายแล้ว', function () {
        self.loadData();
      });
    } else {
      self.message_error('', 'Error');
    }
  }

  onClickBack() {
    let self = this;

    self.route.navigate(['']);
  }

}
