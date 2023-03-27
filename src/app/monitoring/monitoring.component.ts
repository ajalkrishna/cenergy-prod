import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  applianceOverview:any[]=[
    {
      heading:"Total Appliances",
      count:184,
      color:"yellow"
    },
    {
      heading:"Active Appliances",
      count:53,
      color:"green"
    },
    {
      heading:"Critical Appliance",
      count:4,
      color:"red"
    }
  ]
  appliancesToShow:any[]=[];

  applianceStatus:any[]=[
    {
      name:"Juicer",
      status:"ON",
      location:"Kitchen"
    },
    {
      name:"Washing Machine",
      status:"OFF",
      location:"Kitchen"
    },
    {
      name:"Mixer",
      status:"ON",
      location:"Kitchen"

    },
    {
      name:"Refrigerator",
      status:"ON",
      location:"Kitchen"

    },
    {
      name:"Television",
      status:"ON",
      location:"Living Area"

    },
    {
      name:"Blender",
      status:"OFF",
      location:"Kitchen"

    },
    {
      name:"Laptop",
      status:"ON",
      location:"Living Area"

    },
    {
      name:"Computer",
      status:"OFF",
      location:"Living Area"

    },
    {
      name:"Air Conditioner",
      status:"OFF",
      location:"Master Bed-Room"

    },
  ]
  placeOfAction:any[]= ["Entrance", "Living Area", "Dining Area", "Guest Room", "Family Room", "Master Bed-Room", "Bathroom", "Exterior", "Kitchen"]
  floors:any[]=["Ground Floor","First Floor","Second Floor"]


  constructor() { }

  ngOnInit(): void {
    this.appliancesToShow=this.applianceStatus
  }

  chooseRoom(e){
    let chosenRoom =e.target.value;
    
    this.appliancesToShow=this.applianceStatus.filter((room)=>room.location==chosenRoom)
    if(this.appliancesToShow.length==0){
      this.appliancesToShow=this.applianceStatus

    }
    
    
    
  }

}
