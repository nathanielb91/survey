import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SurveyDataService } from '../survey-data.service';

@Component({
  selector: 'app-survey-statistics',
  templateUrl: './survey-statistics.component.html',
  styleUrls: ['./survey-statistics.component.css']
})
export class SurveyStatisticsComponent implements OnInit {

  q1answersArr = [];
  q2answersArr = [];
  q3answersArr = [];
  q4answersArr = [];
  q5answersArr = [];

  q1Option1Total = 0;
  q1Option2Total = 0;
  q1Option3Total = 0;

  q2Option1Total = 0;
  q2Option2Total = 0;

  brownTotal: number;
  blueTotal: number;
  greenTotal: number;
  goldTotal: number;
  redTotal: number;
  blackTotal: number;
  whiteTotal: number;
  otherTotal: number;

  totalAnswered: number;
  avgGreenThings: number;
  minGreenThings: number;
  maxGreenThings: number;


  constructor(private surveyDataService: SurveyDataService) { }

  ngOnInit() {
    this.surveyDataService.getSurveyData().pipe(map(data => {
      for (let i = 0; i < data.length; i++) {
        this.q1answersArr.push(data[i].q1answer);
        this.q2answersArr.push(data[i].q2answer);
        this.q3answersArr.push(data[i].q3answer);
        this.q4answersArr.push(data[i].q4answer);
        this.q5answersArr.push(data[i].q5answer);
      }
      return [
      this.q1answersArr,
      this.q2answersArr,
      this.q3answersArr,
      this.q4answersArr,
      this.q5answersArr];
    })).subscribe(data => {
      this.q1Totals(this.q1answersArr);
      this.q2Totals(this.q2answersArr);
      this.q3Totals(this.q3answersArr);
      this.totalAnswered = this.q1answersArr.length;
      this.q4Average(this.q4answersArr);
      this.minGreenThings = Math.min(...this.q4answersArr);
      this.maxGreenThings = Math.max(...this.q4answersArr);
    });


  }

  logposts() {
    console.log(this.q4answersArr);
  }

  q1Totals(questionArray: string[]) {
    for (let i = 0; i < questionArray.length; i++) {
        switch (questionArray[i]) {
          case 'It is blue because it is blue.':
            this.q1Option1Total ++;
            break;
          case 'Many science, such wow, very fascinate.':
            this.q1Option2Total ++;
            break;
          case 'What really IS blue?':
            this.q1Option3Total ++;
            break;
        }
    }
    console.log(questionArray[0] + '  was answered ' + this.q1Option1Total + ' times!');
    console.log(questionArray[1] + '  was answered ' + this.q1Option2Total + ' times!');
    console.log(questionArray[2] + '  was answered ' + this.q1Option3Total + ' times!');
  }

  q2Totals(questionArray: string[]) {
    for (let i = 0; i < questionArray.length; i++) {
        switch (questionArray[i]) {
          case 'Left':
            this.q2Option1Total ++;
            break;
          case 'Counter-left':
            this.q2Option2Total ++;
            break;
        }
    }
    console.log(questionArray[0] + '  was answered ' + this.q2Option1Total + ' times!');
    console.log(questionArray[1] + '  was answered ' + this.q2Option2Total + ' times!');
  }

  q3Totals(questionArray) {
    const colorsObj = questionArray.flat().reduce((a, v) => (a[v] = (a[v] || 0) + 1, a), {});
    console.log(colorsObj);
    this.brownTotal = colorsObj.Brown;
    this.blueTotal = colorsObj.Blue;
    this.greenTotal = colorsObj.Green;
    this.goldTotal = colorsObj.Gold;
    this.redTotal = colorsObj.Red;
    this.blackTotal = colorsObj.Black;
    this.whiteTotal = colorsObj.White;
    this.otherTotal = colorsObj.Other;
  }

  q4Average(questionArray) {
    let total = 0;
    for (let i = 0; i < questionArray.length; i++) {
      total += questionArray[i];
    }
    this.avgGreenThings = total / questionArray.length;
  }


}
