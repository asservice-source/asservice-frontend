import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomSurveyComponent } from '../../../action-custom-table/action-custom-view.component';
import { Router } from '@angular/router';
import { ApiHTTPService } from '../../../api-managements/api-http.service';

@Component({
  selector: 'app-survey-personal-pending-list',
  templateUrl: './survey-personal-pending-list.component.html',
  styleUrls: ['./survey-personal-pending-list.component.css']
})
export class SurveyPersonalPendingListComponent extends BaseComponent implements OnInit {

  public apiHttp: ApiHTTPService = new ApiHTTPService();

  public settings: any;
  public source: LocalDataSource;

  public documentId: string = "";

  public loading: boolean = false;

  constructor(private route: Router, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.settingsTable();
  }

  ngOnInit() {
    let self = this;

    self.loadData();
  }

  settingsTable() {
    let self = this;

    self.settings = self.getTableSetting({
      villageNo: {
        title: 'หมู่',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      homeNo: {
        title: 'บ้านเลขที่',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      holderName: {
        title: 'ชื่อ-สกุล หัวหน้าครอบครัว',
        filter: false
      },
      memberAmount: {
        title: 'จำนวนสมาชิก',
        filter: false,
        width: '130px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      // isSurvey: {
      //   title: 'สถานะ',
      //   filter: false,
      //   width: '100px',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => {
      //     var surveyStatus = '';
      //     if (cell == true || cell == "true") {
      //       surveyStatus = '<div class="text-center text-green">สำรวจแล้ว</div>';
      //     } else {
      //       surveyStatus = '<div class="text-center text-red">ยังไม่สำรวจ</div>';
      //     }
      //     return surveyStatus;
      //   }
      // },
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyComponent, onComponentInitFunction(instance) {

          instance.survey.subscribe((row) => {
            let homeId = row.homeId;
            let roundId = self.documentId;
            let fromPage = 'pending';
            self.route.navigate(['/main/surveys/personal-detail', homeId, roundId, fromPage]);
          });

        }
      }
    });
  }

  loadData() {
    let self = this;

    self.loading = true;

    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.POPULATION, function (r) {
      if (!self.isEmptyObject(r)) {
        self.documentId = r.rowGUID;

        let params = { "documentId": r.rowGUID, "villageId": "", "osmId": self.userInfo.personId, "homeId": "" };

        self.apiHttp.post('survey_population/search_population_list', params, function (d) {
          if (d != null && d.status.toUpperCase() == "SUCCESS") {
            let tempData = [];
            for (let item of d.response) {
              if (item.isSurvey == false) {
                tempData.push(item);
              }
            }
            self.source = self.ng2STDatasource(tempData);
          }
          self.changeRef.detectChanges();
          self.loading = false;
        });
      }
    });
  }

}
