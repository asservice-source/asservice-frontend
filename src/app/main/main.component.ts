import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
 mylinks: any = [
    {
      "title": "ข้อมูลพื้นฐาน",
      "icon": "dashboard",
      "sublinks": [
        {
          "title": "แบบสำรวจข้อมูลบุคล",
          "link": "/main/surveys/personal"
        },
        {
          "title": " แบบสำรวจข้อมูลผู้เสียชีวิต",
          "link": "/main/surveys/died"
        }
      ]
    },
    {
      "title": "ส่งเสริมสุขภาพ",
      "icon": "dashboard",
      "sublinks": [
        {
          "title": "แบบสำรวจหญิงตั้งครรภ์และหลังคลอด",
          "link": "/main/surveys/pregnant"
        }
      ]
    },
    {
      "title": "การเฝ้าระวัง/ป้องกัน/ควบคุมโรค",
      "icon": "dashboard",
      "sublinks": [
        {
          "title": "ข้อมูลการสำรวจผู้ป่วย",
          "link": ""
        },
        {
          "title": "แบบสำรวจลูกน้ำ",
          "link": "/main/surveys/mosquito"
        },
        {
          "title": "แบบสำรวจความเสียงโรค Metabolic",
          "link": "/main/surveys/metabolic"
        }
      ]
    },
    {
      "title": "การฟื้นฟูสุขภาพ",
      "icon": "dashboard",
      "sublinks": [
        {
          "title": "แบบสำรวจผู้พิการและผู้ป่วยติดเตียง",
          "link": "/main/surveys/patient"
        }
      ]
    },
    {
      "title": "รายงานสรุปแบบฟอร์ม",
      "icon": "dashboard",
      "sublinks": [
        {
          "title": "แบบสรุปข้อมูลบุคคล",
          "link": ""
        },
        {
          "title": "แบบสรุปข้อมูลผู้เสียชีวิต",
          "link": ""
        },
        {
          "title": "แบบสรุปหญิงตั้งครรภ์และหลังคลอด",
          "link": ""
        },
        {
          "title": "แบบสรุปสรุปค่า CI (ลูกน้ำ)",
          "link": ""
        },
        {
          "title": "แบบสรุปผู้ป่วย",
          "link": ""
        },
        {
          "title": "แบบสรุปลูกน้ำ",
          "link": ""
        },
        {
          "title": "แบบสรุปความเสียงโรค Metabolic",
          "link": ""
        },
        {
          "title": "แบบสรุปผู้พิการและผู้ป่วยติดเตียง",
          "link": ""
        }
      ]
    }
  ];
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor() { }

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

}

