import { Component, OnInit, Input ,EventEmitter} from '@angular/core';
import { CancerBean } from '../../../beans/cancer.bean';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
import { Output } from '@angular/core/src/metadata/directives';
import { ApiHTTPService } from '../../../service/api-http.service';

@Component({
  selector: 'app-survey-cancer-form',
  templateUrl: './survey-cancer-form.component.html',
  styleUrls: ['./survey-cancer-form.component.css']
})
export class SurveyCancerFormComponent extends BaseComponent implements OnInit {

  // @Input() action: string;
  // @Input() data: CancerBean;
  // @Input() documentId: string;

  // @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  // public isFindPersonal: boolean = true;
  // public isShowForm: boolean = false;
  // public cancerbean: CancerBean;
  // public resetFind: number = 1;
  // private api: ApiHTTPService;
  // public healtInsuranceTypeList: any;
  // public surveyStatusTypeList: any;
  // public cancerTypeList: any;
  // public disabilityTypeList: any;
  // public disabilityTypeCause: any;
  // public diseaseStatusTypeList: any;
  // public code: string = "Cancer";




  
  public member: PersonalMemberBean = new PersonalMemberBean();



  constructor() {
    super();
  }

  ngOnInit() {

  }

  showModal() {
    let self = this;
  }

  onChangeDate(event: IMyDateModel) {
    let self = this;

    // console.log(event);
    self.member.birthDate = self.getStringDateForDatePickerModel(event.date);
  }
}
