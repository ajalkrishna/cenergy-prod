import { Component, OnInit } from '@angular/core';
import { Chart, scales } from 'chart.js';

@Component({
  selector: 'app-usage-comparison',
  templateUrl: './usage-comparison.component.html',
  styleUrls: ['./usage-comparison.component.scss']
})
export class UsageComparisonComponent implements OnInit {

  constructor() { }
  progressBar: any;
  acr: any = 0;
  dacData = [150, 120, 180, 200, 160, 250, 230, 240, 260, 150, 120];
  indData = [130, 100, 190, 230, 180, 260, 200, 260, 230, 120, 90];
  // peakData = [0.87, 0.83, 1.06, 1.15, 1.13, 1.04, 0.87, 0.88, 0.8, 0.75];
  peakData:any[]=[
    {
      acr:0.87,
      time:"3PM to 4PM"
    },
    {
      acr:0.83,
      time:"4PM to 5PM"
    },
    {
      acr:1.06,
      time:"5PM to 6PM"
    },
    {
      acr:1.15,
      time:"6PM to 7PM"
    },
    {
      acr:1.13,
      time:"7PM to 8PM"
    },
    {
      acr:1.04,
      time:"8PM to 9PM"
    },
    {
      acr:0.87,
      time:"9PM to 10PM"
    },
    {
      acr:0.88,
      time:"10PM to 11PM"
    },
    {
      acr:0.75,
      time:"11PM to 12AM"
    }
  ];
  acrTime:string;
  dacDataToShow: any[] = [100]
  indDataToShow: any[] = [50]
  counter: number = 0;
  comparisonBarChart: any;
  isUnderPeak: boolean = false;
  showAcrInfo:boolean=false;

  ngOnInit(): void {
    this.makeChart();
    this.progressBar = document.querySelector('.progress-bar');

    let updatePeak = setInterval(() => {
      if (this.counter == this.peakData.length) {
        clearInterval(updatePeak);
        return;
      }
      this.progressBar.style.width = '0%';
      this.acr = this.peakData[this.counter].acr;
      this.acrTime = this.peakData[this.counter].time;

      this.progressBar.style.width = String((this.acr / 2) * 100) + '%';
      if (this.acr > 1.1) {
        this.isUnderPeak = true;
      }
    }, 3000)

    let updateDac = setInterval(() => {
      if (this.counter == this.dacData.length) {
        clearInterval(updateDac);
        return;
      }
      this.dacDataToShow = [];
      this.indDataToShow = [];
      this.dacDataToShow.push(this.dacData[this.counter])
      this.indDataToShow.push(this.indData[this.counter])
      this.comparisonBarChart.destroy();
      this.makeChart();
      console.log("say hekllo");
      console.log(this.dacDataToShow);
      console.log(this.indDataToShow);
      this.counter++;
    }, 3000)
  }
  toggleAcrInfo(){
    this.showAcrInfo=!this.showAcrInfo;
  }

  makeChart() {
    this.comparisonBarChart = new Chart("usageAround", {
      type: "bar",
      data: {
        labels: ['Real-time consumption'],
        datasets: [
          {
            data: this.dacDataToShow,
            label: 'Area/Zone Average Consumption',
            backgroundColor: 'darkblue',
            barPercentage: 0.3,

          },
          {
            data: this.indDataToShow,
            label: 'Individual Consumption',
            backgroundColor: 'blue',
            barPercentage: 0.3,

          }
        ]
      },
      options: {

        scales: {
          x: {
            // stacked: true,
            grid: {
              display: false,
            },
            border: {
              display: false
            },
            ticks: {
              color: 'black',
            }

          },
          y: {
            // stacked: true,
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start'
          }
        }
      }


    })

  }
}
