import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyDataService } from '../survey-data.service';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  surveyForm: FormGroup;
  q1options: string[] = [
    'It is blue because it is blue.',
    'Many science, such wow, very fascinate.',
    'What really IS blue?'];
  q2options: string[] = ['Left', 'Counter-left'];
  eyeColors: string[] = [
    'Brown',
    'Blue',
    'Green',
    'Gold',
    'Red',
    'Black',
    'White',
    'Other'];
    surveyComplete = false;


  constructor(private surveyDataService: SurveyDataService) { }

  ngOnInit() {
    this.surveyForm = new FormGroup({
      'q1answer': new FormControl(null),
      'q2answer': new FormControl(null),
      'q3answer': new FormControl(null),
      'q4answer': new FormControl(null),
      'q5answer': new FormControl(null)
    });
  }



  submit() {
    this.surveyComplete = true;
    this.surveyDataService.submitSurvey(this.surveyForm.value);
  }

}
