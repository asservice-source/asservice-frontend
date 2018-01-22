import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
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
  public action: string = this.ass_action.ADD;
  public filtersearch: FilterHeadMosquitoBean;
  public documentId: string;
  public mosquitobean: MosquitoBean = new MosquitoBean();
  public loading;
  public isShowAddPlace: boolean = false;

 public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  public datas: any = [];

  isDisable = true;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    let self = this;
    this.filtersearch = new FilterHeadMosquitoBean();
    //let x = this.formatNumber(totalSurvey);
    let column: string;

    this.settings = this.getTableSetting({

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
            $("#modalMaps").modal("show");
          });

        }
      }
    });
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
    console.log("ChangeFilter");
    //this.isShowList = false;
  }

  onSearch(event: FilterHeadMosquitoBean) {
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
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

  loadData(event: FilterHeadMosquitoBean) {
    let self = this;
    this.loading = true;
    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "homeTypeCode": event.homeType,
      "osmId": event.osmId,
      "homeId": event.homeId
    };
    let params = JSON.stringify(param);
    this.api.post('survey_hici/search_hici_info_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(resp.response);
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
    console.log(param);

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
    if(string){
      if (string.length > 50) {
        strValue = string.substring(0, 50) + '...';
      } else {
        strValue = string;
      }
      return strValue;
    }else{
       strValue = "";
       return strValue;
    }
  }

  getSurveyData(docId, homeId) {
    let self = this;
    self.loading = true;
    let param = {
      "documentId": docId,
      "homeId": homeId
    }
    console.log(param);
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

    self.param_reset++;
    self.changeRef.detectChanges();
    $("#modalMultiMaps").modal("show");
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
