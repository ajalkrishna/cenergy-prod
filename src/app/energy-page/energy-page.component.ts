import { Component, OnInit } from '@angular/core';

declare const window:any;

@Component({
  selector: 'app-energy-page',
  templateUrl: './energy-page.component.html',
  styleUrls: ['./energy-page.component.scss']
})
export class EnergyPageComponent implements OnInit {

  showTip:boolean=true;
  myModal:any;
  showFeedback:boolean=true;

  constructor() { }

  ngOnInit(): void {
    this.myModal = new window.bootstrap.Modal('#myModal', {})
    if(sessionStorage.getItem("status")!="submitted"){
      this.openModal();
    }
  }

  hideTip(){
    this.showTip=false;
  }
  openModal(){
    this.myModal.show();
  }

}
