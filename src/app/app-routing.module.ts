import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyStatisticsComponent } from './survey-statistics/survey-statistics.component';





const appRoutes: Routes = [
  { path: '', component: SurveyQuestionsComponent },
  { path: 'new-survey', component: SurveyQuestionsComponent },
  { path: 'survey-statistics', component: SurveyStatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
