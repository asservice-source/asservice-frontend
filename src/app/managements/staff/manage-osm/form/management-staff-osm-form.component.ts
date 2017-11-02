import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { OSMBean } from '../../../../beans/osm.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { CompleterService, CompleterData, CompleterCmp, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-management-staff-osm-form',
  templateUrl: './management-staff-osm-form.component.html',
  styleUrls: ['./management-staff-osm-form.component.css']
})
export class ManagementStaffOsmFormComponent extends BaseComponent implements OnInit {

  @Input() bean: OSMBean;

  public api: ApiHTTPService = new ApiHTTPService();
  public prefixList: any = [{}];
  public addressData: CompleterData;
  public provinceList: any;
  public isOpen: boolean = false;
  @ViewChild("openCloseExample") private openCloseExample: CompleterCmp;

  constructor(private compService: CompleterService) { 
    super();
    this.bean = new OSMBean();
    this.bean.prefixCode = '';
  }

  ngOnInit() {
    this.setUpPrefix();
    this.setupProvinceList();
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

  setupProvinceList() {
    let _self = this;
    this.api.post('address/province', {}, function (resp) {
      console.log(resp);
      if (resp && resp.status.toUpperCase() == "SUCCESS") {
        _self.provinceList = resp.response;
        _self.addressData = _self.compService.local(_self.provinceList,'name', 'name');
      }
    })
  }
 public onProvinceSelected(item: CompleterItem){
  console.log(item);
 }
  public onOpened(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  public onToggle() {
      if (this.isOpen) {
          this.openCloseExample.close();
      } else {
          this.openCloseExample.open();
          this.openCloseExample.focus();
      }
  }

}
