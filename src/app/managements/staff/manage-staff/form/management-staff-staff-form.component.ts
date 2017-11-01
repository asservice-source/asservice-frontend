import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { StaffBean } from '../../../../beans/staff.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';



@Component({
  selector: 'app-management-staff-staff-form',
  templateUrl: './management-staff-staff-form.component.html',
  styleUrls: ['./management-staff-staff-form.component.css']
})
export class ManagementStaffStaffFormComponent extends BaseComponent implements OnInit {

  @Input() bean: StaffBean;

  public prefixList: any = [{}];
  public api: ApiHTTPService = new ApiHTTPService();

  constructor() {
    super();

    this.bean = new StaffBean();
    this.bean.prefixCode = '';
   }

  ngOnInit() {
    this.setUpPrefix();
  }
  setUpPrefix(){
    let _self = this;
    _self.api.post('person/prefix_list', {} , function (data) {
      console.log(data);
      if (data != null && data.status.toUpperCase() == "SUCCESS") {
        _self.prefixList = data.response;
      } else {
        console.log('error(s) => ' + data.message);
      }
    });
  }
  
}
