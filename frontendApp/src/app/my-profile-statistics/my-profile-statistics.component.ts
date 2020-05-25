import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

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
  view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dni';
  showYAxisLabel = true;
  yAxisLabel = 'Liczba gier';
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  lastGames = null;
  totalGamesCount = 0;
  totalPointsCount = 0;
  totalGuessedWords = 0;
  totalWonGames = 0;
  public dataset = [
    {
      name: {},
      value: 0,
    },
    {
      name: {},
      value: 0,
    },
    {
      name: {},
      value: 0,
    },
  ];
  averagePoints = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getStats().subscribe(data => {
      // @ts-ignore
      const incommingData = data.data;
      this.lastGames = incommingData.lastGames;
      this.totalGamesCount = incommingData.totalGamesCount;
      this.totalPointsCount = incommingData.totalPointsCount;
      this.totalGuessedWords = incommingData.totalGuessedWords;
      this.totalWonGames = incommingData.totalWonGames;
      this.totalGuessedWords = incommingData.totalGuessedWords;
      const avg = (this.totalPointsCount / this.totalGamesCount).toFixed(2);
      this.averagePoints = avg === 'NaN' ? 0 : parseInt(avg);
      const date = new Date();
      let yesterday = new Date();
      yesterday.setDate(date.getDate() - 1);
      let twoDaysAgo = new Date();
      twoDaysAgo.setDate(date.getDate() - 2);
      this.dataset = [
        {
          name: twoDaysAgo,
          value: this.lastGames.twoDaysAgo,
        },
        {
          name: yesterday,
          value: this.lastGames.yesterday,
        },
        {
          name: date,
          value: this.lastGames.today,
        },
      ];
    });
  }
}
