import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {
    // const chart = new CanvasJS.Chart('chartContainer', {
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title: {
    //     text: 'Wygrane w ciągu roku:',
    //   },
    //   data: [
    //     {
    //       type: 'column',
    //       dataPoints: [
    //         { y: 1, label: 'Styczeń' },
    //         { y: 3, label: 'Luty' },
    //         { y: 4, label: 'Marzec' },
    //         { y: 6, label: 'Kwiecień' },
    //         { y: 0, label: 'Maj' },
    //         { y: 12, label: 'Czerwiec' },
    //         { y: 3, label: 'Lipiec' },
    //         { y: 2, label: 'Sierpień' },
    //         { y: 1, label: 'Wrzesień' },
    //         { y: 3, label: 'Październik' },
    //         { y: 0, label: 'Listopad' },
    //         { y: 0, label: 'Grudzień' },
    //       ],
    //     },
    //   ],
    // });
    //
    // chart.render();
  }
}
