import { Component, OnInit, Input } from '@angular/core';
import { VillageBean } from '../../../../beans/village.bean';

@Component({
  selector: 'app-management-staff-village-form',
  templateUrl: './management-staff-village-form.component.html',
  styleUrls: ['./management-staff-village-form.component.css']
})
export class ManagementStaffVillageFormComponent implements OnInit {

  @Input() bean: VillageBean;
  constructor() {
    this.bean = new VillageBean();
   }

  ngOnInit() {
    
  }

}
