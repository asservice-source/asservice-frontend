import { Component, OnInit} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';


declare var $:any;
@Component({
  selector: 'app-management-home-member',
  templateUrl: './management-home-member.component.html',
  styleUrls: ['./management-home-member.component.css']
})
export class ManagementHomeMemberComponent extends BaseComponent implements OnInit {


  public settings: any;
  public source: LocalDataSource = new LocalDataSource();

  constructor() { 
    super();
   
  }

  ngOnInit() {
    
  }
  
}