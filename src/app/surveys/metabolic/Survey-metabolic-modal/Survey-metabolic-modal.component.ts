import { Component, OnInit,Input } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import {Personalities} from './survey-metabolic-modal-bean';


@Component({
  selector: 'app-survey-metabolic-modal',
  templateUrl: './survey-metabolic-modal.component.html',
  styleUrls: ['./survey-metabolic-modal.component.css']
})
export class SurveyMetabolicModalComponent implements OnInit { 

  

  @Input() set citizenID(citizenID:string){
    console.log(citizenID);
  }

 public Personalities = new Personalities();

  // personal_CitizenID = '1-4599-00321-43-2';
  // personal_PatentID = 'ท.89';
  // personal_Fname = 'สมหมาย';
  // personal_Lname = 'หลายใจ';
  // personal_Gender = 'ชาย';
  // personal_AgeYears = 42;
  // personal_AgeMonths = 8;
  // personal_HouseID = '11/1';
  // personal_HgroupID = 8;
  // personal_DistrictID = 'บ้านเป็ด';
  // personal_AmphurID = 'เมือง';
  // personal_CityID = 'ขอนแก่น';

  healtHistory_isDiabetesParent : boolean;
  healtHistory_isOverBmi : boolean;
  healtHistory_isOverBp : boolean;
  healtHistory_isOverFbs : boolean;
  healtHistory_isOvercholesterol : boolean;
  healtHistory_isPregnantDiabetes : boolean;
  healtHistory_isOverBpParent : boolean;

  drugHistory_isSmoke : boolean;
  drugHistory_isDrink : boolean;
  drugHistory_numTobacco : Number;
  drugHistory_numDrink : Number;

  physicalBody_weight : Number;
  physicalBody_height : Number;
  physicalBody_waistline : Number;
  physicalBody_BMI : Number;
  physicalBody_BP1_mm : Number; 
  physicalBody_BP1_hg : Number;
  physicalBody_BP2_mm : Number;
  physicalBody_BP2_hg : Number;

  disease_Diabetes : boolean;
  disease_OverBP : boolean;
  disease_Complication_eye : boolean;
  disease_Complication_kidney : boolean;
  disease_Complication_nerve : boolean;
  disease_Complication_nervousSys : boolean;
  disease_Complication_etc : boolean;

  // dataFor;

  constructor(private http: Http) {
    this.Personalities.personal_CitizenID = 'xxx';
   }

  ngOnInit() {

    

    $('#radioBtn a').on('click', function(){
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#'+tog).prop('value', sel);
      
      $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
      $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
  })

  $('#radioBtn2 a').on('click', function(){
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $('#'+tog).prop('value', sel);
    
    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive2');
    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive2').addClass('active');
})

    
  }

  Smoke(T){
    if(T == 'N'){
      $("#numTobacco").prop('disabled', true);
      this.drugHistory_isSmoke = false;
      
    }else{
      $("#numTobacco").prop('disabled', false);
      this.drugHistory_isSmoke = true;
    }
    
  }

  Drink(T){
    if(T == 'N'){
      $("#timeDrink").prop('disabled', true);
      this.drugHistory_isDrink = false;
    }else{
      $("#timeDrink").prop('disabled', false);
      this.drugHistory_isDrink = true;
    }
  }


  test() {
    // let headers = new Headers({ 'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers});

    // this.http.get('http://192.168.1.59:8080/asservice/gender/getAll', options)
    //   .map(res => res.json())
    //   .subscribe(
    //   data => {
    //     this.dataFor = data;
    //     console.log(this.dataFor);
    //     this.xxx=data[0].Name;
    //   },
    //   error => console.log(error)
    //   );
  }

}
