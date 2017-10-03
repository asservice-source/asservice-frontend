import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import {Xxx} from './metabolic-survey-bean';


@Component({
  selector: 'app-metabolic-survey',
  templateUrl: './metabolic-survey.component.html',
  styleUrls: ['./metabolic-survey.component.css']
})
export class MetabolicSurveyComponent implements OnInit { 


 public xxx = new Xxx();

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

  healtHistory_isDiabetesParent = false;
  healtHistory_isOverBmi = false;
  healtHistory_isOverBp = false;
  healtHistory_isOverFbs = false;
  healtHistory_isOvercholesterol = false;
  healtHistory_isPregnantDiabetes=false;
  healtHistory_isOverBpParent=false;

  drugHistory_isSmoke = false;
  drugHistory_isDrink = false;
  drugHistory_numTobacco;
  drugHistory_numDrink;

  physicalBody_weight;
  physicalBody_height;
  physicalBody_waistline;
  physicalBody_BMI;
  physicalBody_BP1_mm;
  physicalBody_BP1_hg;
  physicalBody_BP2_mm;
  physicalBody_BP2_hg;

  disease_Diabetes = false;
  disease_OverBP = false;
  disease_Complication_eye = false;
  disease_Complication_kidney = false;
  disease_Complication_nerve = false;
  disease_Complication_nervousSys = false;
  disease_Complication_etc = false;

  // dataFor;

  constructor(private http: Http) {
    this.xxx.personal_CitizenID = 'xxx';
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
