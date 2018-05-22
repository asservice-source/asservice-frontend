import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from '../../../ng2-smart-table';
import { ActionCustomView_2_Component, ActionCustomSurveyHistoryComponent } from '../../../action-custom-table/action-custom-view.component';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { FilterHeadMosquitoBean } from '../../../beans/filter-head-mosquito.bean';
import { MosquitoBean } from '../../../beans/mosquito.bean';
import { MapsBean } from '../../../multi-maps/multi-maps.component';
import { ActionCustomViewMapsComponent } from '../../../action-custom-table/action-custom-view.component';

declare var $: any;

@Component({
  selector: 'app-survey-mosquito-list',
  templateUrl: './survey-mosquito-list.component.html',
  styleUrls: ['./survey-mosquito-list.component.css']
})
export class SurveyMosquitoListComponent extends BaseComponent implements OnInit {

  mLocationNo = 0;
  public surveyTypeCode: string = "MONITORHICI";
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  private api: ApiHTTPService;
  public settings: any;
  public columns: any;
  public action: string = this.ass_action.ADD;
  public filtersearch: FilterHeadMosquitoBean;
  public documentId: string;
  public mosquitobean: MosquitoBean = new MosquitoBean();
  public loading;
  public isShowAddPlace: boolean = false;
  public placeData: any = null;

  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  public datas: any = [];

  isDisable = true;
  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.api = new ApiHTTPService();
    self.filtersearch = new FilterHeadMosquitoBean();
    //let x = this.formatNumber(totalSurvey);
    let column: string;

    self.columns = {

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
          return '<div class="wrap-text" title="' + cell + '">' + this.displaySubstring(cell) + '</div>'
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
          let sum = this.formatNumber(cell) || 0;
          return '<div class="text-center">' + sum + '</div>'
        }
      },
      totalDetect: {
        title: 'จำนวนพบ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let sum = this.formatNumber(cell) || 0;
          return '<div class="text-center">' + sum + '</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: MosquitoBean, cell) => {
            self.mosquitobean = new MosquitoBean();
            self.mosquitobean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: MosquitoBean, cell) => {
            let text: string;
            if (row.homeTypeName == 'บ้าน') {
              text = "ต้องการยกเลิกการทำรายการสำรวจของบ้านเลขที่ "
            } else {
              text = "ต้องการยกเลิกการทำรายการสำรวจของ "
            }

            self.message_comfirm("", text + '<span style="color : red">' + row.name + '</span>' + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.documentId, row.homeId);
              }
            });
          });

          instance.maps.subscribe(row => {
            self.param_latitude = row.latitude;
            self.param_longitude = row.longitude;
            self.param_info = 'บ้านของ ' + row.fullName;
            self.param_reset++;
            $("#modalMaps").modal("show");
          });

        }
      }
    };
    self.settings = self.getTableSetting(self.columns);
  }

  ngOnInit() {
  }

  changLocationNo() {
    if (this.mLocationNo == 1) {
      this.isDisable = false;

    } else {
      this.isDisable = true;

    }
  }

  onChangeFilter(event: FilterHeadMosquitoBean) {

  }

  onSearch(event: FilterHeadMosquitoBean) {
    let self = this;

    self.filtersearch = event;
    if (self.isEmpty(this.documentId)) {
      self.documentId = event.rowGUID;
    }

    if (self.documentId == event.rowGUID) {
      self.columns.action = {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: MosquitoBean, cell) => {
            self.mosquitobean = new MosquitoBean();
            self.mosquitobean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: MosquitoBean, cell) => {
            let text: string;
            if (row.homeTypeName == 'บ้าน') {
              text = "ต้องการยกเลิกการทำรายการสำรวจของบ้านเลขที่ "
            } else {
              text = "ต้องการยกเลิกการทำรายการสำรวจของ "
            }

            self.message_comfirm("", text + '<span style="color : red">' + row.name + '</span>' + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.documentId, row.homeId);
              }
            });
          });

          instance.maps.subscribe(row => {
            self.loading = true;

            let param = { "documentId": row.documentId, "homeId": row.homeId };

            self.api.post('survey_hici/hici_by_homeid', param, function (d) {
              if (d != null && d.status.toUpperCase() == "SUCCESS") {
                let data = d.response;
                self.param_latitude = data.latitude;
                self.param_longitude = data.longitude;
                self.param_info = 'บ้านของ ' + data.fullName;
                self.param_reset++;
                $("#modalMaps").modal("show");
              }
              self.loading = false;
            });
          });

        }
      };
      self.settings = self.getTableSetting(self.columns);
    } else {
      self.columns.action = {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyHistoryComponent, onComponentInitFunction(instance) {
          instance.view.subscribe(row => {
            self.onHistory(row);
          });
        }
      }
      self.settings = self.getTableSetting(self.columns);
    }

    this.loadData(event);
  }

  onModalFrom(action: string) {
    this.action = action;
    if (action == this.ass_action.EDIT) {
      this.getSurveyData(this.mosquitobean.documentId, this.mosquitobean.homeId);
    } else {
      this.changeRef.detectChanges();
      $('#find-person-md').modal('show');
    }

  }

  onHistory(row: any) {
    let self = this;

    self.loading = true;

    let params = { "documentId": row.documentId, "homeId": row.homeId };

    this.api.post('survey_hici/hici_by_homeid', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.mosquitobean = resp.response;
        self.changeRef.detectChanges();
        $('#modal-history-mosquito').modal('show');
      }
      self.loading = false;
    });
  }

  loadData(event: FilterHeadMosquitoBean) {
    let self = this;

    self.loading = true;

    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "homeTypeCode": event.homeType,
      "osmId": event.osmId,
      "homeId": event.homeId
    };

    let params = JSON.stringify(param);

    self.api.post('survey_hici/search_hici_info_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(resp.response);
        let totalRows = resp.response.length;
        self.filtersearch.description += '<div class="total-row"><b>'+ totalRows +'</b></div>';
        self.source = self.ng2STDatasource(resp.response);
        self.isShowList = true;
        // self.datas = resp.response;
        // self.setUpTable();
      }
      self.changeRef.detectChanges();
      self.loading = false;
    })
  }

  // setUpTable() {
  //   this.source = this.ng2STDatasource(this.datas);
  //   this.isShowList = true;
  // }

  reloadData(event: any) {
    let self = this;
    if (event) {
      this.message_success('', 'ท่านได้ทำการส่งแบบสำรวจลูกน้ำยุงลายแล้ว', function () {
        //self.loadData(self.filtersearch);
        $('#filter-btnSearch').click();
      });
    } else {
      this.message_error('', 'Error');
    }

  }

  actionDelete(documentid, homeid) {
    let self = this;
    self.loading = true;
    let param = {
      "documentId": documentid,
      "homeId": homeid
    };


    this.api.post('survey_hici/del_hici_info', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ลบรายการสำเร็จ', function () {
          $('#filter-btnSearch').click();
          //self.loadData(self.filtersearch);
        })
      }
      self.loading = false;
    })
  }

  displaySubstring(string: string) {
    let strValue;
    if (string) {
      if (string.length > 50) {
        strValue = string.substring(0, 50) + '...';
      } else {
        strValue = string;
      }
      return strValue;
    } else {
      strValue = "";
      return strValue;
    }
  }

  getSurveyData(docId, homeId) {
    let self = this;

    self.loading = true;

    let param = { "documentId": docId, "homeId": homeId };

    this.api.post('survey_hici/hici_by_homeid', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.mosquitobean = resp.response;
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
      self.loading = false;
    });
  }

  onClickMultiMaps() {
    let self = this;

    self.loading = true;

    let param = {
      "documentId": self.filtersearch.rowGUID,
      "villageId": self.filtersearch.villageId,
      "homeTypeCode": self.filtersearch.homeType,
      "osmId": self.filtersearch.osmId,
      "homeId": self.filtersearch.homeId
    };

    let params = JSON.stringify(param);

    self.api.post('survey_hici/search_hici_info_list', params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(d.response);
        self.param_reset++;
        self.changeRef.detectChanges();
      }
      $("#modalMultiMaps").modal("show");
      self.loading = false;
    });
  }

  bindMultiMaps(data) {
    let self = this;

    self.param_listPosition = [];
    for (let item of data) {
      if (item.latitude && item.longitude) {
        let map = new MapsBean();
        map.latitude = item.latitude;
        map.longitude = item.longitude;
        map.info = 'บ้านของ ' + item.fullName;
        self.param_listPosition.push(map);
      }
    }
  }

}
