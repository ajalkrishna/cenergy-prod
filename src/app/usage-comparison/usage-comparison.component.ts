import { Component, OnInit } from '@angular/core';
import { offset } from '@popperjs/core';
import { Chart, scales } from 'chart.js';

@Component({
  selector: 'app-usage-comparison',
  templateUrl: './usage-comparison.component.html',
  styleUrls: ['./usage-comparison.component.scss']
})
export class UsageComparisonComponent implements OnInit {

  constructor() { }
  progressBar: any;
  acr:any=0;

  ngOnInit(): void {
    this.makeChart();
    this.progressBar = document.querySelector('.progress-bar');

    setInterval(()=>{
    this.progressBar.style.width='0%';
    this.acr = Math.ceil(Math.random()*2*100)/100
    this.progressBar.style.width=String((this.acr/2)*100)+'%';      
    },3000)
  }

  makeChart() {
    const comparisonPieChart = new Chart("usageAround", {
      type: "bar",
      data: {
        labels: ['Real-time consumption'],
        datasets: [
          {
            data: [100],
            label: 'Divisional Average Consumption',
            backgroundColor: 'darkblue',
            barPercentage: 0.15,

          },
          {
            data: [50],
            label: 'Personal Consumption',
            backgroundColor: 'blue',
            barPercentage: 0.15,

          }
        ]
      },
      options: {

        scales: {
          x: {
            stacked: true,
            grid: {
              display:false,
            },
            border: {
              display: false
            },
            ticks:{
              color:'black',
            }
            
          },
          y: {
            stacked: true,
          }
        },
        plugins:{
          legend:{
            position:'bottom',
            align:'start'
          }
        }
      }


    })

  }
}
