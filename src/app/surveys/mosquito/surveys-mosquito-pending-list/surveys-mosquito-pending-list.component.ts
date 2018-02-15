import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-surveys-mosquito-pending-list',
  templateUrl: './surveys-mosquito-pending-list.component.html',
  styleUrls: ['./surveys-mosquito-pending-list.component.css']
})
export class SurveysMosquitoPendingListComponent extends BaseComponent implements OnInit {

  public apiHttp: ApiHTTPService = new ApiHTTPService();

  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.settingsTable();
  }

  ngOnInit() {
    let self = this;

    self.loadData();
  }

  loadData() {
    let self = this;

    self.loading = true;

    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.MONITORHICI, function (roundInfo) {
      if (!self.isEmptyObject(roundInfo)) {
        let params = { "documentId": roundInfo.rowGUID, "osmId": self.userInfo.personId };

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
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {

          // instance.edit.subscribe((row: MosquitoBean, cell) => {
          //   self.mosquitobean = new MosquitoBean();
          //   self.mosquitobean = self.cloneObj(row);
          //   self.onModalFrom(self.ass_action.EDIT);
          // });

          // instance.delete.subscribe((row: MosquitoBean, cell) => {
          //   let text: string;
          //   if (row.homeTypeName == 'บ้าน') {
          //     text = "ต้องการยกเลิกการทำรายการสำรวจของบ้านเลขที่ "
          //   } else {
          //     text = "ต้องการยกเลิกการทำรายการสำรวจของ "
          //   }

          //   self.message_comfirm("", text + '<span style="color : red">' + row.name + '</span>' + " ใช่หรือไม่", function (resp) {
          //     if (resp) {
          //       self.actionDelete(row.documentId, row.homeId);
          //     }
          //   });
          // });

          // instance.maps.subscribe(row => {
          //   self.param_latitude = row.latitude;
          //   self.param_longitude = row.longitude;
          //   self.param_info = 'บ้านของ ' + row.fullName;
          //   $("#modalMaps").modal("show");
          // });

        }
      }
    });
  }

}
