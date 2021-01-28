import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SurveyDataService {

  loadedPosts = [];


  constructor(private http: HttpClient) { }

  submitSurvey(surveyData: any) {
    this.http.post('https://survey-383aa-default-rtdb.firebaseio.com/posts.json', surveyData).subscribe(responseData => {});
  }

  getSurveyData() {
    return this.http.get('https://survey-383aa-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }));
  }

  // getData2() {
  //   return this.http.get('https://survey-383aa-default-rtdb.firebaseio.com/posts.json');
  // }

}
