import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';
import {PatientBean} from '../../../beans/patient.bean'
declare var $: any;

@Component({
  selector: 'app-survey-patient-list',
  templateUrl: './survey-patient-list.component.html',
  styleUrls: ['./survey-patient-list.component.css']
})
export class SurveyPatientListComponent extends BaseComponent implements OnInit {

  public patientType: number = 0;
  public isShowsick: boolean = true;
  public surveyTypeCode: string = "PATIENT";
  public patientbean : PatientBean = new PatientBean();
  public action: string = this.ass_action.ADD;

  private api: ApiHTTPService;
  public settings: any;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  public healtInsuranceID = 7;
  public datas:any = [];

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTableSetting({

      name: {
        title: 'ชื่อ - นามสกุล',
        filter: false
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      reason: {
        title: 'สาเหตุความพิการ/ป่วย',
        filter: false,
        width: '190px',
      },
      gender: {
        title: 'เพศ',
        filter: false,
        width: '70px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      type: {
        title: 'ประเภท',
        filter: false,
        width: '120px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
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

          instance.action.subscribe((row: PatientBean, cell) => {
            if (row && row.action.toUpperCase() == self.ass_action.EDIT) {
              self.patientbean = self.cloneObj(row);
              self.onModalFrom(self.ass_action.EDIT);
            }
          });
        }
      }
    });
  }

  ngOnInit() {
    this.setUpTable();
  }

  checkPatient() {
    if (this.patientType == 1) {
      this.isShowsick = false;
    } else if (this.patientType == 2) {
      $("#disabled").hide();
    }
  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    this.isShowList = false;
  }

  onSearch(event: FilterHeadSurveyBean) {
      let self = this;
      let param = {
        "documentId" : event.rowGUID,
        "villageId" : event.villageId,
        "osmId" : event.osmId,
        "name" :event.fullName,
        "rowGUID": ""
      };
      let params = JSON.stringify(param);
  
      this.api.post('survey_patient/filter', params, function (resp) {
        console.log(resp);
        if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
          self.datas = resp.response;
          console.log("=====================================================");
          console.log(self.datas);
          self.setUpTable();
        }
      })
    this.setUpTable();
  }

  setUpTable() {
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

  onModalFrom(action: string){
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

}
