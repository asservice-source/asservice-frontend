import { Component, Input, Output, EventEmitter} from '@angular/core';
import { PersonBean } from "../beans/person.bean";
declare var $:any;
@Component({
  selector: 'app-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.css']
})
export class FindPersonComponent {
  @Input() set title(title: string) {

    console.log('got title: ', title);
  
  }
  @Output() notify: EventEmitter<PersonBean> = new EventEmitter<PersonBean>();
  public personBean : PersonBean;
  public mVillageNo = 0;
  public mOSM = 0;
  public mHomeNo = 0;
  public mPerson = 0;

  public isDisabledOSM = true;
  public isDisabledHomeNo = true;
  public isDisabledPerson = true;
  public isDisableBtnSearch = true;
  constructor() { 
    this.personBean = new PersonBean();
    this.personBean.citizenID = '1122323232323';
    this.personBean.firstName = 'Firstname';
    this.personBean.lastName = 'Lastname';
    this.personBean.nickName = "Sum";
  }

  doPersonChange(){
    
    this.notify.emit(this.personBean);
  }

  changVillageNo(){
    if(this.mVillageNo>0){
      this.isDisabledOSM = false;
      this.isDisabledHomeNo = false;
    }else{
      this.isDisabledHomeNo = true;
      this.isDisabledOSM = true;
    }
    
  }
  changHomeNo(){
    if(this.mHomeNo != 0){
      this.isDisableBtnSearch = false;
    }else{
      this.isDisableBtnSearch = true;
    }
    
  }
  doSearchPerson(){
    this.isDisabledPerson = false;
  }
}
