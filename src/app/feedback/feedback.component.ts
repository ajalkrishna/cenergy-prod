import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("status")!="submitted"){
      sessionStorage.setItem("status","not-submitted")
    }
  }
  closeModal(){
    sessionStorage.removeItem("status")
    sessionStorage.setItem("status","submitted")
  }

}
