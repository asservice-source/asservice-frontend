import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { FilterHeadMosquitoBean } from '../../../beans/filter-head-mosquito.bean';
import { MosquitoBean } from '../../../beans/mosquito.bean';

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

  public datas :any = [];

  isDisable = true;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    let self = this;
    this. filtersearch = new FilterHeadMosquitoBean();

    let column : string;

    this.settings = this.getTableSetting({
    
      name: {
        title: 'ชื่อ/บ้านเลขที่',
        filter: false,
        type:'html'
      },
      homeTypeName: {
        title: 'ประเภท',
        filter: false,
        width: '120px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      totalSurvey: {
        title: 'ภาชนะที่สำรวจ',
        filter: false,
        width: '150px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      totalDetect: {
        title: 'ภาชนะที่พบ',
        filter: false,
        width: '150px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: MosquitoBean, cell) => {
            self.mosquitobean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: MosquitoBean, cell) => {
            let text : string;
            if(row.homeTypeName == 'บ้าน'){
              text = "ต้องการยกเลิกการทำรายการสำรวจของบ้านเลขที่ "
            }else{
              text = "ต้องการยกเลิกการทำรายการสำรวจของ "
            }

            self.message_comfirm("", text + '<span style="color : red">'+row.name +'</span>' + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.documentId,row.homeId);
                 self.loadData(self.filtersearch);
              }
            });
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


  // onSearch(event: FilterHeadSurveyBean) {
  //   console.log(event);
  //   this.source = new LocalDataSource(this.datas);
  //   this.isShowList = true;
  //   super.setNg2STDatasource(this.source);
  // }

  onSearch(event: FilterHeadMosquitoBean) {
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
    }
    this.loadData(event);
  }

  onModalFrom(action: string) {
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

  loadData(event: FilterHeadMosquitoBean) {
    let self = this;
    let param = {   
        "documentId":event.rowGUID,
        "villageId":event.villageId,
        "homeTypeCode": event.homeType,
        "osmId":event.osmId,
        "homeId":event.homeId
    };
    let params = JSON.stringify(param);

    this.api.post('survey_hici/search_hici_info_list', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.datas = resp.response;
        self.setUpTable();
      }
    })

  }

  setUpTable() {
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

  reloadData(event: any) {
    if (event) {
      this.loadData(this.filtersearch);
    }
  }

  actionDelete(documentid,homeid) {

    let self = this;
    let param = {
      "documentId": documentid,
      "homeId": homeid
    };
    console.log(param);

    this.api.post('survey_hici/del_hici_info', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('','ลบรายการสำเร็จ')
      }
    })
  }

}
