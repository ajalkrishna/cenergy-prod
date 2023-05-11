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


  listOfLabel: string[] = ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
  dataList: number[] = [2.2, 3.9, 4, 4, 4.2, 4, 4.2, 4, 4.5, 1.9, 2.9, 1.8, 7.6, 7.1, 7.9, 8.5, 10.2, 10.1, 9.9, 10.3];
  meterReadings: any;
  chosenReading: any = {
    readingDate: ''
  }
  readingTime: any;
  chart: any;
  dailyConsumption: any;
  tariffInPounds: any = 0;
  counter: number = 0;
  realtimeCounter: any
  readingOption: boolean = false;
  warningMessage: boolean = false;
  warningIcon: boolean = false;
  energyTabStatus: boolean = true;
  dateArray: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  yearArray: any[] = ['2021', '2020', '2019'];
  // monthArray: any[] = [
  //   {
  //     month: 'January',
  //     code: '01'
  //   },
  //   {
  //     month: 'February',
  //     code: '02'
  //   },
  //   {
  //     month: 'March',
  //     code: '03'
  //   },
  //   {
  //     month: 'April',
  //     code: '04'
  //   },
  //   {
  //     month: 'May',
  //     code: '05'
  //   },
  //   {
  //     month: 'June',
  //     code: '06'
  //   },
  //   {
  //     month: 'July',
  //     code: '07'
  //   },
  //   {
  //     month: 'August',
  //     code: '08'
  //   },
  //   {
  //     month: 'September',
  //     code: '09'
  //   },
  //   {
  //     month: 'October',
  //     code: '10'
  //   },
  //   {
  //     month: 'November',
  //     code: '11'
  //   },
  //   {
  //     month: 'December',
  //     code: '12'
  //   },
  // ];
  yesterdayDataInkWh: number[] = [0.323, 0.297, 0.344, 0.315, 0.402, 0.367, 0.366, 0.353, 0.398, 0.326, 0.417, 0.355, 0.351, 0.324, 0.275, 0.276, 0.452, 0.358, 0.309, 0.379, 0.363, 0.452, 0.555, 0.358, 0.423, 0.456, 0.477, 0.409, 0.391, 0.45, 0.412, 0.437, 0.4, 0.432, 0.733, 0.481, 0.463, 0.966, 0.943, 0.492, 0.951, 0.564, 0.471, 1.055, 0.497, 0.294, 0.253, 0.26]
  excessConsumption: any[] = [];
  pastReadingToggle: boolean = true;
  totalThreshold: number = 236;
  excessUsage: number = 0;
  consumptionInPounds: any[] = []
  readingFromMeter: any[] = []
  url: string = 'https://api-v2-sandbox.data.n3rgy.com/mpxn/2234567891000/utility/electricity/readingtype/consumption?start=201905150000&end=201905152330&granularity=halfhour&outputFormat=json';
  urlDay: string = 'https://api-v2-sandbox.data.n3rgy.com/mpxn/2234567891000/utility/electricity/readingtype/consumption?start=201812250000&end=201903162330&granularity=day&outputFormat=json'
  dateList: string[] = [];
  dayWiseResponse: any;
  poundArray: any[] = [];
  displayShowResultsButton: boolean = false;
  showDate: boolean = false;
  showMonth: boolean = false;
  showYear: boolean = false;
  formattedMonth: string;
  formattedDate: string;
  responseOfSelectedDay: any;
  toggleReadingDisplayed: boolean = true;
  selection: string;
  yesterdayDataInPounds: number[] = [0.035, 0.033, 0.037, 0.035, 0.042, 0.039, 0.039, 0.038, 0.042, 0.036, 0.044, 0.038, 0.038, 0.035, 0.031, 0.031, 0.047, 0.038, 0.034, 0.04, 0.039, 0.047, 0.056, 0.038, 0.044, 0.047, 0.049, 0.043, 0.041, 0.047, 0.043, 0.046, 0.042, 0.045, 0.072, 0.05, 0.048, 0.093, 0.091, 0.051, 0.092, 0.057, 0.049, 0.101, 0.051, 0.033, 0.029, 0.03]
  barDate: string[] = [];
  barReading: number[] = [];
  disableYesterday: boolean = false;
  showYesterdayCheck: boolean = false;
  barPoundRate: number[] = [];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  consumptionIn2018 =[572.02, 484.54, 523.57, 518.39, 507.47, 476.49, 559.8, 533.67, 421.68, 512.63, 544.18, 558.02]
  ngOnInit(): void {
    // this.meterReadings = this.reading.meterReadings;
    // this.readingTime = this.reading.readingTime;
    this.makeTheChart(this.listOfLabel, this.readingFromMeter, 'Consumptions in kWh', 0.4, 'kWh');
    // this.updateChart();
    this.createChartForDay();
  }



  createChartForDay() {
    fetch(this.url, {
      headers: {
        "x-api-key": "d388dc30-7562-4835-a21f-93eee1515cbe"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.responseOfSelectedDay = data;
        this.chosenReading.readingDate = this.responseOfSelectedDay.devices[0].values[0].timestamp.split(" ")[0];
        for (const each of data.devices[0].values) {
          this.readingFromMeter.push(each.primaryValue);
        }
        if (this.selection == 'pounds') {
          this.displayGraphBasedOnType();

        } else {
          // this.chart.data.datasets[0].data = this.readingFromMeter;
          this.chart.destroy();
          this.makeTheChart(this.listOfLabel, this.readingFromMeter, 'Consumptions in kWh', 0.4, 'kWh');


        }
        this.chart.data.datasets[0].label = this.chosenReading.readingDate;
        this.calculateTotalConsumption()
        // this.chart.update()

      });
  }

  getMonthlyData() {
    this.barDate = [];
    this.barReading = [];
    this.barPoundRate = [];
    fetch(this.urlDay, {
      headers: {
        "x-api-key": "d388dc30-7562-4835-a21f-93eee1515cbe"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.dayWiseResponse = data.devices[0].values;
        for (const each of this.dayWiseResponse) {
          this.barDate.push(each.timestamp.split("-")[2]);
          this.barReading.push(each.primaryValue)
          this.barPoundRate.push(Number((each.primaryValue * 0.15 + 9).toFixed(2)));
        }

        this.chosenReading.readingDate = this.months[Number(this.dayWiseResponse[0].timestamp.split("-")[1]) - 1] + ", " + this.dayWiseResponse[0].timestamp.split("-")[0];
        this.dailyConsumption = 0;
        this.barReading.forEach(val => this.dailyConsumption += val);
        this.dailyConsumption = this.dailyConsumption.toFixed(2)
        this.tariffInPounds = 0;
        this.barPoundRate.forEach(val => this.tariffInPounds += val);
        this.tariffInPounds = this.tariffInPounds.toFixed(2)


        if (this.selection == 'pounds') {
          this.displayBarGraphBasedOnType();
        } else {
          this.chart.destroy();
          this.createBarChartOfMonthlyConsumption(this.barDate, this.barReading, 'Consumption in kWh', 'kWh');
        }

      })
  }

  toggleType(e) {
    this.selection = e.target.value;
    if (this.showMonth && this.disableYesterday) {
      this.displayBarGraphBasedOnType()
    } else {
      this.showYesterdayCheck = false;
      this.displayGraphBasedOnType();
    }
  }
  displayBarGraphBasedOnType() {
    if (this.selection == "pounds") {
      this.toggleReadingDisplayed = false;
      this.chart.destroy();
      this.createBarChartOfMonthlyConsumption(this.barDate, this.barPoundRate, 'Consumption in £', '£')
    } else {
      this.toggleReadingDisplayed = true;
      this.chart.destroy();
      this.createBarChartOfMonthlyConsumption(this.barDate, this.barReading, 'Consumption in kWh', 'kWh')
    }
  }

  displayGraphBasedOnType() {
    console.log(this.showYesterdayCheck);
    
    if (this.selection == "pounds") {
      this.toggleReadingDisplayed = false;
      this.poundArray = []
      let tarriffInPounds = 0
      for (const each of this.readingFromMeter) {
        let inPounds = Number(each * 0.09 + 0.00625).toFixed(3)
        this.poundArray.push(inPounds);
        tarriffInPounds += Number(inPounds);
      }

      this.tariffInPounds = Number(tarriffInPounds.toFixed(2));
      this.chart.destroy();
      this.makeTheChart(this.listOfLabel, this.poundArray, 'Consumption In £', 0.04, '£');
    } else {
      this.toggleReadingDisplayed = true;
      this.chart.destroy();
      this.makeTheChart(this.listOfLabel, this.readingFromMeter, 'Consumptions in kWh', 0.4, 'kWh');


    }
  }


  makeTheChart(labelList, readingToShow, yText, stepSize, unit) {
    this.chart = new Chart('acquisitions', {
      type: 'line',
      data: {
        labels: labelList,
        datasets: [{
          label: this.chosenReading.readingDate,
          data: readingToShow,
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
              text: yText
            },
            ticks: {
              stepSize: stepSize
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
            }
          }
        },
        animation: false,
        plugins: {
          legend: {
            display: true,
            align: "end",
            labels: {
              boxHeight: 2,
              boxWidth: 30,
              color: 'black'
            }
          },
          tooltip: {
            // enabled:false
            backgroundColor: 'rgba(255, 255, 255)',
            titleColor: '#000',
            bodyColor: '#000',
            borderWidth: 1,
            borderColor: '#000',
            mode: 'index',
            boxHeight: 1,
            boxPadding: 2,
            padding: 4,
            intersect: false,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + unit;
                }
                return label;
              }
            }
          }
        }

      }
    });
    this.calculateTotalConsumption()

  }


  chooseTimeline(e) {
    let selection = e.target.value;
    this.displayShowResultsButton = true;
    if (selection == "Day") {
      this.updateTimelineDisplay(true, false, false);
    } else if (selection == "Month") {
      this.updateTimelineDisplay(false, true, false);

    } else if (selection == "Year") {
      this.updateTimelineDisplay(false, false, true);
    } else {
      this.updateTimelineDisplay(false, false, false);
      this.displayShowResultsButton = false;
    }

  }
  updateTimelineDisplay(date, month, year) {
    this.showDate = date;
    this.showMonth = month;
    this.showYear = year;
  }
  chooseDate(e) {
    this.readingFromMeter = []
    let date = e.target.value
    this.formattedDate = date.replace("-", "").replace("-", "");
  }

  chooseMonth(e) {
    let month = e.target.value;
    this.formattedMonth = month.replace("-", "")

  }


  showResults() {
    this.disableYesterday = true;
    if (this.showDate) {
      // this.showDate=false;
      let start = this.formattedDate + "0000"
      let end = this.formattedDate + "2330"
      this.url = `https://api-v2-sandbox.data.n3rgy.com/mpxn/2234567891000/utility/electricity/readingtype/consumption?start=${start}&end=${end}&granularity=halfhour&outputFormat=json`
      this.createChartForDay()
    }
    if (this.showMonth) {
      // this.showMonth=false;
      let start = this.formattedMonth + "010030";
      let end = this.formattedMonth + "310000"
      this.urlDay = `https://api-v2-sandbox.data.n3rgy.com/mpxn/2234567891000/utility/electricity/readingtype/consumption?start=${start}&end=${end}&granularity=day&outputFormat=json`
      this.getMonthlyData();
    }
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

  calculateTotalConsumption() {
    this.dailyConsumption = 0;
    for (let reading of this.readingFromMeter) {
      this.dailyConsumption = this.dailyConsumption + reading;
    }
    this.dailyConsumption = Number(this.dailyConsumption.toFixed(2));
  }

  toggleEnergyTab() {
    this.energyTabStatus = !this.energyTabStatus;
  }


  showYesterday(e) {
    if (e.target.checked) {
      let yesterdayDataset;

      if (this.selection == "pounds") {
        yesterdayDataset = {
          label: '2019-05-14',
          data: this.yesterdayDataInPounds,
          borderWidth: 2,
          pointStyle: false,
          borderColor: 'rgba(226, 181, 2, 0.902)',
          cubicInterpolationMode: 'monotone',
        }
      } else {
        yesterdayDataset = {
          label: '2019-05-14',
          data: this.yesterdayDataInkWh,
          borderWidth: 2,
          pointStyle: false,
          borderColor: 'rgba(226, 181, 2, 0.902)',
          cubicInterpolationMode: 'monotone',
        }
      }


      this.chart.data.datasets.push(yesterdayDataset)
    }
    else {
      if (this.chart.data.datasets.length > 1) {
        this.chart.data.datasets.pop();
      }
    }
    this.chart.update();
  }

  createBarChartOfMonthlyConsumption(barDate, barReading, yText, unit) {
    this.chart = new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels: barDate,
        datasets: [{
          label: 'Consumption',
          data: barReading,
          borderWidth: 1,
          // pointBackgroundColor: 'rgba(255, 0, 0)',
          // pointRadius: 2,
          pointStyle: false,
          backgroundColor: 'rgba(1, 1, 201, 0.716)',
          borderSkipped: true

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
              text: yText
            },
            ticks: {
              stepSize: 15
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
              text: 'Days'
            }
          }
        },
        // animation: false,
        plugins: {
          legend: {
            display: true,
            align: "end",
            labels: {
              boxHeight: 2,
              boxWidth: 30,
              color: 'black'
            }
          },
          tooltip: {
            // enabled:false
            backgroundColor: 'rgba(255, 255, 255)',
            titleColor: '#000',
            bodyColor: '#000',
            borderWidth: 1,
            borderColor: '#000',
            mode: 'index',
            boxHeight: 1,
            boxPadding: 2,
            padding: 4,
            intersect: false,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + unit;
                }
                return label;
              }
            }
          }
        }
      }
    })
  }

  resetToPresent() {
    this.readingFromMeter = [];
    this.disableYesterday = !this.disableYesterday;
    this.url = `https://api-v2-sandbox.data.n3rgy.com/mpxn/2234567891000/utility/electricity/readingtype/consumption?start=201905150000&end=201905152330&granularity=halfhour&outputFormat=json`
    this.createChartForDay()
  }

}
