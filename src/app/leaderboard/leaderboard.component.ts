import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  peerConsumption: any[] = [
    {
      consumerNo: 'xxx23418',
      consumerName: 'consumer 1',
      consumption: 200
    },
    {
      consumerNo: 'xxx23448',
      consumerName: 'consumer 2',
      consumption: 210
    },
    {
      consumerNo: 'xxx23468',
      consumerName: 'consumer 3',
      consumption: 180
    },
    {
      consumerNo: 'xxx23438',
      consumerName: 'consumer 4',
      consumption: 260
    },
    {
      consumerNo: 'xxx23428',
      consumerName: 'consumer 5',
      consumption: 230
    },
  ]
  updatedArray: any[] = []
  consumptionArray: any[] = []
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.updateRanking()

    },2000)
  }

  updateRanking() {
    this.consumptionArray=[];
    this.updatedArray=[];
    for (const each of this.peerConsumption) {
      each.consumption+=Math.ceil(Math.random()*5)
      this.consumptionArray.push(each.consumption)
    }
    
    for (let i = 0; i < this.consumptionArray.length; i++) {
      let reading = this.consumptionArray.sort()[i]    
      let update = this.peerConsumption.find((each) => each.consumption == reading);
      this.updatedArray.push(update);
    }
    this.peerConsumption = this.updatedArray;
  }
  updateConsumption(increment){
    for (const each of this.peerConsumption) {
      each.consumption=increment;
      this.consumptionArray.push(each.consumption)
    }
  }

}
