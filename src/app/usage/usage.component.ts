import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReadingService } from '../reading.service';
Chart.register(...registerables);



@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

  constructor(private reading: ReadingService) { }

  tableStatus: boolean = false;
  graphStatus: boolean = true;
  listOfLabel: string[] =['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
  //listOfLabel: string[] = ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30'];
  dataList: number[] = [2.2, 3.9, 4, 4, 4.2, 4, 4.2, 4, 4.5, 1.9, 2.9, 1.8, 7.6, 7.1, 7.9, 8.5, 10.2, 10.1, 9.9, 10.3];
  meterReadings: any;
  chosenReading: any = {
    readingDate: '30-08-2019'
  }
  readingTime: any;
  chart: any;
  dailyConsumption: number;
  counter: number = 0;
  realtimeCounter: any
  readingOption: boolean = false;
  warningMessage: boolean = false;
  warningIcon: boolean = false;
  energyTabStatus: boolean = true;
  dateArray: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  yearArray: any[] = ['2021', '2020', '2019'];
  monthArray: any[] = [
    {
      month: 'January',
      code: '01'
    },
    {
      month: 'February',
      code: '02'
    },
    {
      month: 'March',
      code: '03'
    },
    {
      month: 'April',
      code: '04'
    },
    {
      month: 'May',
      code: '05'
    },
    {
      month: 'June',
      code: '06'
    },
    {
      month: 'July',
      code: '07'
    },
    {
      month: 'August',
      code: '08'
    },
    {
      month: 'September',
      code: '09'
    },
    {
      month: 'October',
      code: '10'
    },
    {
      month: 'November',
      code: '11'
    },
    {
      month: 'December',
      code: '12'
    },
  ];
  excessConsumption: any[] = [];
  pastReadingToggle: boolean = true;
  totalThreshold: number = 236;
  excessUsage: number = 0;


  ngOnInit(): void {
    this.meterReadings = this.reading.meterReadings;
    this.readingTime = this.reading.readingTime;

    this.makeTheChart();


    this.realtimeCounter = setInterval(() => {

      this.addOne(this.counter)
      this.counter++;
    }, 1000);
  }

  showTable() {
    this.tableStatus = true;
    this.graphStatus = false;
  }
  showGraph() {
    this.tableStatus = false;
    this.graphStatus = true;
  }


  makeTheChart() {
    this.chart = new Chart('acquisitions', {
      type: 'line',
      data: {
        labels: this.listOfLabel,
        datasets: [{
          label: 'Consumption (kWh)',
          data: this.dataList,
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 0, 0)',
          pointRadius: 2,
          pointStyle: false,
          backgroundColor: 'rgba(0, 0, 90)',
          borderColor: 'red',
          cubicInterpolationMode: 'monotone',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            border: {
              color: 'rgba(0,0,90)'
            },
            grid: {
              tickColor: 'rgba(0,0,90'
            },
            title: {
              color: 'darkblue',
              display: true,
              text: 'Consumption in kWh'
            },
            ticks: {
              stepSize: 3
            }

          },
          x: {
            border: {
              color: 'rgba(0,0,90)'
            },
            grid: {
              // color:'transparent'
              display: false,
              tickColor: 'rgba(0,0,90)'

            },
            title: {
              color: 'darkblue',
              display: true,
              text: 'Time of consumption (updating every 30 min)'
            },
            ticks: {
              // color:'red',
              // callback: function(val, index) {
              //   // Hide every 2nd tick label
              //   return index % 6 === 0 ? this.getLabelForValue(index) : '';
              // },
            }
          }
        },
        animation: false,
        layout: {
          padding: 30
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            // enabled:false
            backgroundColor: 'rgba(255, 255, 255)',
            titleColor: '#000',
            bodyColor: '#000',
            borderWidth: 1,
            borderColor: '#000',
            mode: 'index',
            intersect: false
          }
        }

      }
    });
    this.calculateTotalConsumption()

  }

  addOne(id) {
    // this.listOfLabel.push('dummy');
    let labels = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
    let data = [8.9, 10.4, 9.5, 8.8, 8.7, 8.6, 8.7, 8.8, 9.4, 9.4, 9.3, 9.1, 7.1, 4, 2.5, 2, 1.9, 1.9, 1.9, 1.9, 2, 2, 1.9, 2, 1.9, 1.9, 2.1, 2]
    if (id == labels.length) {
      clearInterval(this.realtimeCounter);
      return;
    }
    if (data[id] > 9) {
      let consumption = {
        time: labels[id],
        value: data[id]
      }
      this.excessConsumption.push(consumption)
    }
    // this.listOfLabel.push(labels[id])
    this.dataList.push(data[id])
    this.dailyConsumption += Math.ceil(data[id]);
    this.excessUsage = this.dailyConsumption - this.totalThreshold;
    if (this.dailyConsumption == this.totalThreshold) {
      this.warningMessage = true;
      setTimeout(() => {
        this.warningMessage = false;
        this.warningIcon = true;
      }, 5000);
    }
    this.chart.update();
  }
  closeWarning() {
    this.warningMessage = false;

  }

  setupLabelAndData(date) {
    this.chosenReading = this.meterReadings.find(obj => obj.readingDate == date);
    let reading = this.chosenReading;
    for (const key in reading) {

      if (key == 'readingDate' || key == 'date' || key == 'month' || key == 'year' || key == 'accountNumber' || key == 'mpxn') {
        continue
      } else {
        this.listOfLabel.push(this.readingTime[key]);
      }

      this.dataList.push(reading[key]);
    }



  }

  chooseGraph(e: any) {
    clearInterval(this.realtimeCounter);
    let date = e.target[2].value + '-' + e.target[1].value + '-' + e.target[0].value;
    this.listOfLabel = [];
    this.dataList = [];
    this.setupLabelAndData(date);
    this.chart.destroy();
    this.makeTheChart();   
    
  }

  calculateTotalConsumption() {
    this.dailyConsumption = 0;
    for (let reading of this.dataList) {
      this.dailyConsumption = Math.ceil(this.dailyConsumption + reading);
    }
  }

  choosePastReadingsOption() {
    this.readingOption = !this.readingOption
    this.pastReadingToggle = !this.pastReadingToggle

  }
  resetGraph() {
    this.listOfLabel = [];
    this.dataList = [];
    this.setupLabelAndData('30-08-2019');
    this.chart.destroy();
    this.makeTheChart();
    console.log(this.listOfLabel);
    console.log(this.dataList);


  }

  toggleEnergyTab() {
    this.energyTabStatus = !this.energyTabStatus;
  }

}
