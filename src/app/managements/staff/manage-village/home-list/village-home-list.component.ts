import { Component, OnInit, ChangeDetectorRef, EventEmitter, Input, Output} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../../action-custom-table/action-custom-view.component';
import { VillageBean } from '../../../../beans/village.bean';
import { Service_Home } from '../../../../api-managements/service-home';

declare var $:any;
@Component({
  selector: 'app-village-home-list',
  templateUrl: './village-home-list.component.html',
  styleUrls: ['./village-home-list.component.css']
})
export class StaffVillageHomeListComponent extends BaseComponent implements OnInit {
  @Input() bean: VillageBean; 
  public api: Service_Home;
  public settings_1: any;
  public settings_2: any;
  public source_1: LocalDataSource;
  public source_2: LocalDataSource;
  public datas: any //= [{villageId:'1', villageNo: 1, villageName: 'บ้านหนองหลุบ'}];
  public loading: boolean = false; 
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.bean = new VillageBean();
    let _self = this;
    this.api = new Service_Home();
    this.settings_1 = this.getTableSetting({
      homeNo: {
        title: 'บ้านเลขที่' ,
        filter: false,
         width: '100px',
      },
      holderFullName: {
        title: 'เจ้าบ้าน' ,
        filter: false,
      }
    });
    this.settings_2 = this.getTableSetting({
      homeNo: {
        title: 'เลขที่' ,
        filter: false,
         width: '100px',
      },
      name: {
        title: 'ชื่อสถานที่' ,
        filter: false,
      }
    });
    
   }

    ngOnInit() {
      this.bindModal();
     
    }
    setupTable(){
      console.log(this.bean);
      let villageId = this.bean.villageId;
      let osmId = "";
      let homeTypeCode = "";
      let searchName = "";

      let _self = this;
      _self.loading = true;
      this.api.getList(villageId, osmId, homeTypeCode, searchName,function(response){
        _self.loading = false;
        _self.datas = response;
        let items_1: Array<any> = new Array();
        let items_2: Array<any> = new Array();
        for(let item of _self.datas){
          if(item.homeTypeCode == '01'){
            items_1.push(item);
          }else{
            items_2.push(item);
          }
        }
        _self.source_1 = _self.ng2STDatasource(items_1);
        _self.source_2 = _self.ng2STDatasource(items_2);
        _self.changeRef.detectChanges();
      });
    }
    bindModal(){
      let _self = this;
      $('#modalHomeList').on('show.bs.modal', function(){
        _self.source_1 = null;
        _self.source_2 = null;
        _self.setupTable();
      });
    }
}
