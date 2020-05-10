import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
// import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-my-profile-statistics',
  templateUrl: './my-profile-statistics.component.html',
  styleUrls: [
    './my-profile-statistics.component.css',
    '../../css/logoSmall.css',
    '../../css/button.css',
  ],
})
export class MyProfileStatisticsComponent implements OnInit {
  numberOfGames = 35;
  wins = 25;
  losts = 10;
  sumOfPoints = 1500;
  pointsAvg = 100;
  view: any[] = [600, 400];
  // options for the chart
  mainColor = '#fff';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Miesiące';
  showYAxisLabel = true;
  yAxisLabel = 'Liczba gier';
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  // data
  public single = [
    {
      name: 'Styczeń',
      value: 12,
    },
    {
      name: 'Luty',
      value: 14,
    },
    {
      name: 'Marzec',
      value: 12,
    },
    {
      name: 'Kwiecień',
      value: 0,
    },
  ];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    console.log('ehe')
    this.userService.getStats().subscribe(data => {
      console.log(data)
    })
  }
}
