import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-index-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class IndexContentComponent implements OnInit{
  public config: SwiperOptions = {
    // pagination: '.swiper-pagination',
    // paginationClickable: true,
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    // spaceBetween: 20
    //autoHeight: true, //enable auto height
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: 3000,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    // coverflow: {
    //   rotate: 50,
    //   stretch: 0,
    //   depth: 100,
    //   modifier: 1,
    //   slideShadows : true,
    // }
  };
  constructor(public user: UserService, private router: Router){
 
  }
  ngOnInit(): void { 


  }
}