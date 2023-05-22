import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReadingService } from '../reading.service';
import { ConsumptionApiService } from '../consumption-api.service';
Chart.register(...registerables);

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

  constructor(private reading: ReadingService, private api: ConsumptionApiService) { }


  listOfLabel: string[] = ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
  meterReadings: any;
  chosenReading: any = {
    readingDate: ''
  }
  chart: any;
  dailyConsumption: any;
  tariffInPounds: any = 0;
  warningMessage: boolean = false;
  //warningIcon: boolean = false;
  energyTabStatus: boolean = true;
  yesterdayDataInkWh: number[] = [0.323, 0.297, 0.344, 0.315, 0.402, 0.367, 0.366, 0.353, 0.398, 0.326, 0.417, 0.355, 0.351, 0.324, 0.275, 0.276, 0.452, 0.358, 0.309, 0.379, 0.363, 0.452, 0.555, 0.358, 0.423, 0.456, 0.477, 0.409, 0.391, 0.45, 0.412, 0.437, 0.4, 0.432, 0.733, 0.481, 0.463, 0.966, 0.943, 0.492, 0.951, 0.564, 0.471, 1.055, 0.497, 0.294, 0.253, 0.26]
  //excessConsumption: any[] = [];
  //pastReadingToggle: boolean = true;
  //totalThreshold: number = 236;
  //excessUsage: number = 0;
  //consumptionInPounds: any[] = []
  readingFromMeter: any[] = []
  //dateList: string[] = [];
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
  consumptionIn2018 = [572.02, 484.54, 523.57, 518.39, 507.47, 476.49, 559.8, 533.67, 421.68, 512.63, 544.18, 558.02];
  yearWiseConsumption: any = [];
  yearWiseConsumptionInPounds: any[] = [];
  chosenYear: any;
  lastUpdateStatus: boolean = true;
  monthArrayOfChosenYear: any[] = []
  readingArrayOfChosenYear: any[] = []

  ngOnInit(): void {
    this.makeTheChart(this.listOfLabel, this.readingFromMeter, 'Consumptions in kWh', 0.4, 'kWh');
    this.createChartForDay({ start: 201905150000, end: 201905152330, granularity: 'halfhour' });
  }



  createChartForDay(input) {
    this.api.getConsumption(input).subscribe((data) => {
      this.responseOfSelectedDay = data;
      this.chosenReading.readingDate = this.responseOfSelectedDay.devices[0].values[0].timestamp.split(" ")[0];
      for (const each of data.devices[0].values) {
        this.readingFromMeter.push(each.primaryValue);
      }
      if (this.selection == 'pounds') {
        this.displayGraphBasedOnType();

      } else {
        this.chart.destroy();
        this.makeTheChart(this.listOfLabel, this.readingFromMeter, 'Consumptions in kWh', 0.4, 'kWh');


      }
      this.chart.data.datasets[0].label = this.chosenReading.readingDate;
      this.calculateTotalConsumption()
    })
    // fetch(this.url, {
    //   headers: {
    //     "x-api-key": "d388dc30-7562-4835-a21f-93eee1515cbe"
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     this.responseOfSelectedDay = data;
    //     this.chosenReading.readingDate = this.responseOfSelectedDay.devices[0].values[0].timestamp.split(" ")[0];
    //     for (const each of data.devices[0].values) {
    //       this.readingFromMeter.push(each.primaryValue);
    //     }
    //     if (this.selection == 'pounds') {
    //       this.displayGraphBasedOnType();

    //     } else {
    //       // this.chart.data.datasets[0].data = this.readingFromMeter;
    //       this.chart.destroy();
    //       this.makeTheChart(this.listOfLabel, this.readingFromMeter, 'Consumptions in kWh', 0.4, 'kWh');


    //     }
    //     this.chart.data.datasets[0].label = this.chosenReading.readingDate;
    //     this.calculateTotalConsumption()
    //     // this.chart.update()

    //   });
  }

  getMonthlyData(input) {
    this.barDate = [];
    this.barReading = [];
    this.barPoundRate = [];
    this.api.getConsumption(input).subscribe((data) => {
      this.dayWiseResponse = data.devices[0].values;
      for (const each of this.dayWiseResponse) {
        this.barDate.push(each.timestamp.split("-")[2]);
        this.barReading.push(each.primaryValue)
        this.barPoundRate.push(Number((each.primaryValue * 0.15 + 9).toFixed(2)));
      }
      this.chosenReading.readingDate = this.months[Number(this.dayWiseResponse[0].timestamp.split("-")[1]) - 1] + ", " + this.dayWiseResponse[0].timestamp.split("-")[0];
      this.updateConsumptionValue(this.barReading, this.barPoundRate);
      if (this.selection == 'pounds') {
        this.displayBarGraphBasedOnType();
      } else {
        this.chart.destroy();
        this.createBarChartOfMonthlyConsumption(this.barDate, this.barReading, 'Consumption in kWh', 'kWh', 20);
      }
    })
  }

  toggleType(e) {

    this.selection = e.target.value;
    if (this.showMonth && this.disableYesterday) {
      this.displayBarGraphBasedOnType()
    } else if (this.showYear && this.disableYesterday) {
      this.displayYearwiseBarGraphBasedOnType();
    }
    else {
      this.showYesterdayCheck = false;
      this.displayGraphBasedOnType();
    }
  }
  displayBarGraphBasedOnType() {
    if (this.selection == "pounds") {
      this.toggleReadingDisplayed = false;
      this.chart.destroy();
      this.createBarChartOfMonthlyConsumption(this.barDate, this.barPoundRate, 'Consumption in £', '£', 10)
    } else {
      this.toggleReadingDisplayed = true;
      this.chart.destroy();
      this.createBarChartOfMonthlyConsumption(this.barDate, this.barReading, 'Consumption in kWh', 'kWh', 20)
    }
  }

  displayYearwiseBarGraphBasedOnType() {
    if (this.selection == "pounds") {
      this.toggleReadingDisplayed = false;
      this.chart.destroy();
      this.createBarChartOfYearlyConsumption(this.yearWiseConsumptionInPounds, "Consumption In £", "£", 20)

    } else {
      this.toggleReadingDisplayed = true;
      this.chart.destroy();
      this.createBarChartOfYearlyConsumption(this.yearWiseConsumption, "Consumption In kWh", "kWh", 400)
    }
  }

  displayGraphBasedOnType() {

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
    this.lastUpdateStatus = false;
    if (this.showDate) {
      let start = this.formattedDate + "0000"
      let end = this.formattedDate + "2330"
      this.createChartForDay({ start: start, end: end, granularity: 'halfhour' })
    }
    if (this.showMonth) {
      let start = this.formattedMonth + "010030";
      let end = this.formattedMonth + "310000"
      this.getMonthlyData({ start: start, end: end, granularity: 'day' });
    }

    if (this.showYear) {
      this.updateConsumptionValue(this.yearWiseConsumption, this.yearWiseConsumptionInPounds)
      this.chosenReading.readingDate = this.chosenYear;
      this.chart.destroy();
      if (this.selection == "pounds") {
        this.createBarChartOfYearlyConsumption(this.yearWiseConsumptionInPounds, "Consumption In £", "£", 20)
      } else {
        this.createBarChartOfYearlyConsumption(this.yearWiseConsumption, "Consumption In kWh", "kWh", 400)
      }
    }
  }

  updateConsumptionValue(kwhReading, poundReading) {
    this.dailyConsumption = 0;
    kwhReading.forEach(val => this.dailyConsumption += val);
    this.dailyConsumption = this.dailyConsumption.toFixed(2)
    this.tariffInPounds = 0;
    poundReading.forEach(val => this.tariffInPounds += val);
    this.tariffInPounds = this.tariffInPounds.toFixed(2)
  }

  closeWarning() {
    this.warningMessage = false;
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

  createBarChartOfMonthlyConsumption(barDate, barReading, yText, unit, yStep) {
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
              stepSize: yStep
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

  createBarChartOfYearlyConsumption(barReading, yText, unit, yStep) {
    this.chart = new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Consumption',
          data: barReading,
          borderWidth: 1,
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
              stepSize: yStep
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
              text: 'Months'
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
    this.lastUpdateStatus = true;
    this.createChartForDay({ start: 201905150000, end: 201905152330, granularity: 'halfhour' })
  }

  chooseYear(e) {
    this.chosenYear = e.target.value;
    let yearWithMonth;
    this.monthArrayOfChosenYear = []
    this.readingArrayOfChosenYear = []

    for (let month = 1; month <= 12; month++) {
      if (month < 10) {
        yearWithMonth = this.chosenYear + "0" + month;
      } else {
        yearWithMonth = this.chosenYear + month;
      }
      let urlParamsData = {
        start: yearWithMonth + "010030",
        end: yearWithMonth + "312330",
        granularity: 'day'
      }

      this.getYearWiseData(urlParamsData, month)
    }
  }

  getYearWiseData(urlParams, month) {
    let consumptionDataForGraph = [];
    this.yearWiseConsumption = []
    this.yearWiseConsumptionInPounds = []
    this.api.getConsumption(urlParams).subscribe((data) => {
      let consumption = 0;
      if (data.devices[0]) {
        consumption = this.findTotalConsumption(data.devices[0].values)
      } else {
        consumption = 0;
      }

      let sortedMonth = {
        monthCode: month,
        consumption: consumption
      }

      this.readingArrayOfChosenYear.push(sortedMonth);
      this.readingArrayOfChosenYear.sort((first, second) => first.monthCode - second.monthCode);
      this.readingArrayOfChosenYear.forEach((each) => consumptionDataForGraph.push(each.consumption))
      this.yearWiseConsumption = consumptionDataForGraph
      let poundArray = []
      this.yearWiseConsumption.forEach((each) => {
        if (each != 0) {
          poundArray.push(Number((each * 0.09 + 9).toFixed(2)))

        } else {
          poundArray.push(each)

        }
        this.yearWiseConsumptionInPounds = poundArray;

      })

    })
  }
  findTotalConsumption(consumption) {
    let sum = 0;
    consumption.forEach((each) => sum += each.primaryValue)
    sum = Number(sum.toFixed(2))
    return sum;
  }

}
