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
  peakData = [0.87, 0.83, 1.06, 1.15, 1.13, 1.04, 0.87, 0.884, 0.8, 0.75]
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
      this.acr = this.peakData[this.counter];

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
