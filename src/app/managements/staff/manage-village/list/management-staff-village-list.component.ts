import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../../action-custom-table/action-custom-view.component';
import { VillageBean } from '../../../../beans/village.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { Service_Village } from '../../../../service/service-village';

declare var $:any;
@Component({
  selector: 'app-management-staff-village-list',
  templateUrl: './management-staff-village-list.component.html',
  styleUrls: ['./management-staff-village-list.component.css']
})
export class ManagementStaffVillageListComponent extends BaseComponent implements OnInit {
  public action: string;
  public api: Service_Village;
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
    this.api = new Service_Village();
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
            _self.onClickDelete(row);
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
    onClickDelete(bean: any){
      console.log(bean);
      let _self = this;
      _self.message_comfirm('','ต้องการลบหมู่บ้าน <b>'+ bean.villageName +'</b> ใช่หรือไม่', function(isComfirm){
        if(isComfirm){
          _self.loading = true;
          _self.api.commit_del(bean.id, function(resp){
            _self.loading = false;
            let response = resp.response;
            if(response && "SUCCESS" == resp.status.toUpperCase()){
              _self.message_success('', 'ลบหมู่บ้าน <b>'+ bean.villageName +'</b> สำเร็จ', function(){
                _self.setupDataList();
              });
            }else{
              let msg: string = resp.message;
              if(msg && msg.indexOf('REFERENCE')>=0){
                _self.message_error('','ไม่สามารถลบ <b>'+ bean.villageName +'</b> ได้เนื่องจากหมู่บ้านนี้ได้ถูกนำไปใช้แล้ว');
              }else{
                _self.message_error('','ไม่สามารถลบ <b>'+ bean.villageName +'</b> ได้<br>'+msg);
              }
              
            }
          });
        }
      });
      
    }
    onReturnAdd(response: any){
      if('SUCCESS' == response.status.toUpperCase()){
        this.setupDataList();
      }
    }
}
