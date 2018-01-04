import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
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
  public loading;
  public isShowAddPlace : boolean = false;

  public datas :any = [];

  isDisable = true;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    let self = this;
    this. filtersearch = new FilterHeadMosquitoBean();
    //let x = this.formatNumber(totalSurvey);
    let column : string;

    this.settings = this.getTableSetting({
    
      name: {
        title: 'ชื่อ/บ้านเลขที่',
        filter: false,
        type:'html'
      },
      address: {
        title: 'ที่อยู่',
        filter: false,
        width: '340px',
        type:'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="wrap-text" title="' + cell + '">' + this.displaySubstring(cell) + '</div>'
        }
      },
      homeTypeName: {
        title: 'ประเภท',
        filter: false,
        width: '100px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      totalSurvey: {
        title: 'จำนวนสำรวจ',
        filter: false,
        width: '120px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+this.formatNumber(cell)+'</div>'
        }
      },
      totalDetect: {
        title: 'จำนวนพบ',
        filter: false,
        width: '100px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+this.formatNumber(cell)+'</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomView_2_Component,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: MosquitoBean, cell) => {
            self.mosquitobean = new MosquitoBean();
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
              }
            });
          });
        }
      }
    });
  }

  ngOnInit() {
   // this.loading = true;
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
    //this.mosquitobean = new MosquitoBean();
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
    this.loading = true;
    let params = JSON.stringify(param);
    this.api.post('survey_hici/search_hici_info_list', params, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.datas = resp.response;
        self.setUpTable();
      }
      self.changeRef.detectChanges();
    })

  }

  setUpTable() {
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

  reloadData(event: any) {
    let self = this;
    if (event) {
      this.message_success('', 'ท่านได้ทำการส่งแบบสำรวจลูกน้ำยุงลายแล้ว', function () {
        self.loadData(self.filtersearch);
      });
    } else {
      this.message_error('', 'Error');
    }
  
  }

  actionDelete(documentid,homeid) {

    let self = this;
    let param = {
      "documentId": documentid,
      "homeId": homeid
    };
    console.log(param);
    self.loading = true;
    this.api.post('survey_hici/del_hici_info', param, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('','ลบรายการสำเร็จ',function(){
          self.loadData(self.filtersearch);
        })
      }
    })
  }

  displaySubstring(string: string) {
    let strValue;
    if (string.length > 50) {
      strValue = string.substring(0, 50) + '...';
    } else {
      strValue = string;
    }
    return strValue;
  }

}
