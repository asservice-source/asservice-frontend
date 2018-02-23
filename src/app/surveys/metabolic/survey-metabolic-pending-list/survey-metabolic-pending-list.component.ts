import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomSurveyComponent } from '../../../action-custom-table/action-custom-view.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { MetabolicBean } from '../../../beans/metabolic.bean';
import { Service_SurveyMetabolic } from '../../../api-managements/service-survey-metabolic';
import {PersonBean} from '../../../beans/person.bean';
declare var $;

@Component({
  selector: 'app-survey-metabolic-pending-list',
  templateUrl: './survey-metabolic-pending-list.component.html',
  styleUrls: ['./survey-metabolic-pending-list.component.css']
})
export class SurveyMetabolicPendingListComponent extends BaseComponent implements OnInit {

  public apiHttp: Service_SurveyMetabolic = new Service_SurveyMetabolic();

  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  public action: string = "";
  public documentId: string = "";
  public roundInfo: any;
  public personData: PersonBean = new PersonBean();

  public loading: boolean = false;

  constructor(private route: Router, private changeRef: ChangeDetectorRef) {
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

      fullName: {
        title: 'ชื่อ - นามสกุล',
        filter: false,
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      homeNo: {
        title: 'บ้านเลขที่',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (value) => {
          return '<div class="text-center">' + value + '</div>'
        }
      },
      genderName: {
        title: 'เพศ',
        filter: false,
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyComponent,
        onComponentInitFunction(instance) {

          instance.survey.subscribe((row: any, cell) => {
            // self.metabolicBean = new MetabolicBean();
            self.personData = self.cloneObj(row);
            self.action = self.ass_action.ADD;
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

    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.METABOLIC, function (r) {
      if (!self.isEmptyObject(r)) {
        self.documentId = r.rowGUID;

        let params = { "documentId": r.rowGUID, "osmId": self.userInfo.personId };

        self.apiHttp.post('survey_metabolic/search_metabolic_list_not_survey', params, function (d) {
          if (d != null && d.status.toUpperCase() == "SUCCESS") {
            self.source = self.ng2STDatasource(d.response);
          }
          self.changeRef.detectChanges();
          self.loading = false;
        });
      }
    });
  }

  getSurveyData(rowGUID) {
    let self = this;

    self.loading = true;

    self.apiHttp.getMetabolicInfo(rowGUID, function (d) {
      if (d.response && d.status.toUpperCase() == 'SUCCESS') {
        self.personData = self.cloneObj(d.response);
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
      self.loading = false;
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
