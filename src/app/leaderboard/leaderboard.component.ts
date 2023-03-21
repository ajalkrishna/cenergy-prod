import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  latestNews: any[] = ["Customer Satisfaction and Engagement - 92%", "AT&C losses - 4%", "Billing Efficiency - 98%"];
  constructor() { }

  ngOnInit(): void {
  }

}
