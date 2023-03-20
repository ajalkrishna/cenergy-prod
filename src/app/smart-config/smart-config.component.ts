import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-config',
  templateUrl: './smart-config.component.html',
  styleUrls: ['./smart-config.component.scss']
})
export class SmartConfigComponent implements OnInit {

  configuredAppliances = [
    {
      placeOfAction: 'Kitchen',
      applianceName: 'Juicer',
      timeOfUse: '4PM-5PM',
      priority: 1,
      powerRating: 600,
      consumptionInHrs: 1
    },
    {
      placeOfAction: 'Kitchen',
      applianceName: 'lamp',
      timeOfUse: '6PM-10PM',
      priority: 5,
      powerRating: 15,
      consumptionInHrs: 4
    },
    {
      placeOfAction: 'Living-Area',
      applianceName: 'Television',
      timeOfUse: '6PM-8PM',
      priority: 2,
      powerRating: 80,
      consumptionInHrs: 2
    },
    {
      placeOfAction: 'Dining',
      applianceName: 'Ceiling-Fan',
      timeOfUse: '10AM-11AM',
      priority: 4,
      powerRating: 70,
      consumptionInHrs: 1
    },
    {
      placeOfAction: 'Master Bed-Room',
      applianceName: 'Air Conditioner',
      timeOfUse: '7PM-1AM',
      priority: 3,
      powerRating: 1200,
      consumptionInHrs: 6
    }
  ]

  configOptions = {
    placeOfAction: ["Entrance", "Living Area", "Dining Area", "Guest Room", "Family Room", "Master Bed-Room", "Bathroom", "Exterior", "Kitchen"],
    appliances: ["Ceiling-Fan", "Indoor-Light", "Exterior-Light", "Computer", "Television", "Refrigerator", "Heater", "Cooler", "Air Conditioner"],
    timeOfUse: ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "12AM"],
    priority: [5, 4, 3, 2, 1]
  }
  appliance = {
    placeOfAction: '',
    applianceName: '',
    timeOfUse: '',
    priority: 0,
    powerRating: 0,
    consumptionInHrs: 2
  }
  fromTime: any;
  toTime: any;

  constructor() { }

  ngOnInit(): void {
  }
  configureNewAppliance() {
    this.appliance.timeOfUse = this.fromTime + "-" + this.toTime;
    this.appliance.powerRating=Math.random()*100;
    this.configuredAppliances.push(this.appliance);

  }

  choosePlaceOfAction(e) {
    this.appliance.placeOfAction = e.target.value;
  }
  chooseAppliance(e) {
    this.appliance.applianceName = e.target.value;

  }
  chooseTimeOfUseFrom(e) {
    this.fromTime = e.target.value;
  }
  chooseTimeOfUseTo(e) {
    this.toTime = e.target.value;
  }
  choosePriority(e) {
    this.appliance.priority = e.target.value;
  }

}
