import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { MosquitoBean } from '../../../beans/mosquito.bean';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
declare var $;

@Component({
  selector: 'app-survey-mosquito-history',
  templateUrl: './survey-mosquito-history.component.html',
  styleUrls: ['./survey-mosquito-history.component.css']
})
export class SurveyMosquitoHistoryComponent extends BaseComponent implements OnInit {

  @Input() data: MosquitoBean;

  private api: ApiHTTPService = new ApiHTTPService();;

  public mosquitoBean: MosquitoBean;
  public containerTypeList: any;

  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.mosquitoBean = new MosquitoBean();
    self.mosquitoBean.listContainerType = [];
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
    self.listContainerType();
  }

  onModalEvent() {
    let self = this;

    $('#modal-history-mosquito').on('show.bs.modal', function (e) {
      self.mosquitoBean = self.data;
      if (!self.isEmptyObject(self.mosquitoBean.listContainerType)) {
        for (let i = 0; i < self.containerTypeList.length; i++) {
          self.containerTypeList[i].totalSurvey = self.mosquitoBean.listContainerType[i].totalSurvey;
          self.containerTypeList[i].totalDetect = self.mosquitoBean.listContainerType[i].totalDetect;
        }
      }
      self.changeRef.detectChanges();
    });

    $('#modal-history-mosquito').on('hidden.bs.modal', function () {

    });
  }

  listContainerType() {
    let self = this;

    let params = {};

    self.api.post('survey_hici/container_type_list', params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.containerTypeList = d.response;
      }
    });
  }

}
