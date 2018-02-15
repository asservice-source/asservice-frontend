import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomSurveyEditComponent } from '../../../action-custom-table/action-custom-view.component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MosquitoBean } from '../../../beans/mosquito.bean';
declare var $;

@Component({
  selector: 'app-surveys-mosquito-pending-list',
  templateUrl: './surveys-mosquito-pending-list.component.html',
  styleUrls: ['./surveys-mosquito-pending-list.component.css']
})
export class SurveysMosquitoPendingListComponent extends BaseComponent implements OnInit {

  public apiHttp: ApiHTTPService = new ApiHTTPService();

  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  public action: string = "";
  public documentId: string = "";
  public roundInfo: any;
  public mosquitoBean: MosquitoBean = new MosquitoBean();

  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
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
        width: '350px',
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
      totalSurvey: {
        title: 'จำนวนสำรวจ',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + this.formatNumber(cell) + '</div>'
        }
      },
      totalDetect: {
        title: 'จำนวนพบ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + this.formatNumber(cell) + '</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyEditComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: MosquitoBean, cell) => {
            self.mosquitoBean = new MosquitoBean();
            self.mosquitoBean = self.cloneObj(row);
            self.action = self.ass_action.EDIT;
            self.getSurveyData(row.documentId, row.homeId);
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
          if (d != null && d.status.toUpperCase() == "SUCCESS") {
            self.source = self.ng2STDatasource(d.response);
          }
          self.changeRef.detectChanges();
          self.loading = false;
        });
      }
    });
  }

  getSurveyData(docId, homeId) {
    let self = this;

    self.loading = true;

    let params = { "documentId": docId, "homeId": homeId };
    
    self.apiHttp.post('survey_hici/hici_by_homeid', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.mosquitoBean = resp.response;
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

}
