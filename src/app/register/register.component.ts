import { Component, OnInit } from '@angular/core';
import { HospitalBean } from "../beans/hospital.bean";
import { PersonBean } from "../beans/person.bean";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hospitalBean: HospitalBean;
  public personBean: PersonBean;
  constructor() {
    this.hospitalBean = new HospitalBean();
    this.personBean = new PersonBean();
   }

  ngOnInit() {
  }

}
