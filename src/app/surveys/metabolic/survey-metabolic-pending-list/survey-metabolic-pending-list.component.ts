import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomSurveyComponent } from '../../../action-custom-table/action-custom-view.component';
import { LocalDataSource } from '../../../ng2-smart-table';
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

  public action: string = this.ass_action.ADD;
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
          return '<div class="text-center">' + self.formatCitizenId(cell)  + '</div>'
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
            self.modalShow(row);
          });

        }
      }
    });
  }

  loadData() {
    this.loading = true;
    if(this.isEmpty(this.documentId)){
      this.getRound(this.getListMetabolic);
    }else{
      this.getListMetabolic(this);
    }
  }
  getListMetabolic(self){
    let params = { "documentId": self.documentId, "osmId": self.userInfo.personId };
    self.apiHttp.post('survey_metabolic/search_metabolic_list_not_survey', params, data => {
      self.loading = false;
      if (data != null && data.status.toUpperCase() == "SUCCESS") {
        self.source = self.ng2STDatasource(data.response);

      }
      setTimeout(()=>{self.changeRef.detectChanges()}, 500);
    });
  }
  getRound(callBack:any){
    let self = this;
    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.METABOLIC, data => {
      self.loading = false;
      if (!self.isEmptyObject(data)) {
        self.documentId=data.rowGUID;
        callBack(self);
      }
    });
  }

  modalShow(row) {
    console.log('ROW',row);
    this.personData = this.cloneObj(row);
    this.personData.osmId=this.userInfo.personId;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

  callbackData(event: any) {
    let self = this;

    if (event) {
      self.message_success('', 'ทำแบบสำรวจความเสี่ยงโรค Metabolic เรียบร้อย', () => {
        self.loadData();
      });
    } else {
      self.message_error('', 'ไม่สามารถทำรายการได้');
    }
  }

  onClickBack() {
    let self = this;

    self.route.navigate(['']);
  }

}
