import { Component, OnInit } from '@angular/core';
import { HomeBean } from '../../../beans/home.bean';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';

@Component({
  selector: 'app-management-osm-area',
  templateUrl: './management-osm-area.component.html',
  styleUrls: ['./management-osm-area.component.css']
})
export class ManagementOsmAreaComponent extends BaseComponent implements OnInit {

  public bean: HomeBean = new HomeBean();
  public api: ApiHTTPService = new ApiHTTPService();
  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  constructor() { 
    super();
    let _self = this;
    this.settings = this.getTableSetting({
      homeNo: {
        title: "บ้านเลขที่",
        filter: false,
        width: '120px',
      },
      holderName:{
        title: "เจ้าบ้าน",
        filter: false,
      },
      memberAmont:{
        title: "จำนวนสมาชิก",
        filter: false,
        width: '160px',
      },
      action: {
        title: this.getLabel('lbl_action'),
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
       
          instance.view.subscribe(row => {

           });
           instance.edit.subscribe(row => {
            _self.bean = _self.cloneObj(row);
            _self.onModalForm();
           });
           instance.delete.subscribe(row => {

           });
          instance.action.subscribe((row, cell) => {
            console.log(row);
          });
        }
      }
    });
  }

  ngOnInit() {

  }
  onModalForm(){

  }
}
