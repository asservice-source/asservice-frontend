import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../../action-custom-table/action-custom-view.component';
import { VillageBean } from '../../../../beans/village.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';

declare var $:any;
@Component({
  selector: 'app-management-staff-village-list',
  templateUrl: './management-staff-village-list.component.html',
  styleUrls: ['./management-staff-village-list.component.css']
})
export class ManagementStaffVillageListComponent extends BaseComponent implements OnInit {
  public action: string;
  public api: ApiHTTPService = new ApiHTTPService();
  public settings: any;
  public source: LocalDataSource;
  public bean: VillageBean;
  public datas: any //= [{villageId:'1', villageNo: 1, villageName: 'บ้านหนองหลุบ'}];
  public loading: boolean = false; 
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.action = this.ass_action.ADD;
    this.bean = new VillageBean();
    let _self = this;
    this.settings = this.getTableSetting({
      villageNo: {
        title: 'หมู่ที่' ,
        filter: false,
         width: '80px',
      },
      villageName: {
        title: 'ชื่อหมู่บ้าน',
        filter: false,
        //width: '180px',
      },
      
      action: {
        title: this.getLabel('lbl_action'),
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomView_2_Component,
        onComponentInitFunction(instance) {
           instance.edit.subscribe(row => {
            _self.bean = _self.cloneObj(row);
            _self.bean.villageId = row.id;
            _self.onModalForm(_self.ass_action.EDIT);
           });
           instance.delete.subscribe(row => {
            _self.message_error('','<h3>ยังลบไม่ได้ครับ รอแป๊บ..</h3>');
           });
           
          instance.action.subscribe((row, cell) => {
            console.log(row);
          });
        }
      }
    });
    
   }

    ngOnInit() {
      
      this.setupDataList();
    }
    setupDataList(){
      
      let _self = this;
      _self.loading = true;
      this.api.api_villageList(this.getHospitalCode(),function(response){
        _self.loading = false;
        _self.source = _self.ng2STDatasource(response);
        _self.changeRef.detectChanges();
      });
    }
    onModalForm(action: string){
      this.action = action;
      $('#modalForm').modal('show');
    }
    onClickAdd(){
     
      this.bean = new VillageBean();
      this.onModalForm(this.ass_action.ADD);
    }
    onReturnAdd(response: any){
      if('SUCCESS' == response.status.toUpperCase()){
        this.setupDataList();
      }
    }
}
