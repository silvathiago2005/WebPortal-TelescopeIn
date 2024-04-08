import { Component } from '@angular/core';
import { AppInsightsService } from '../app/services/app-insights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(appInsightsService: AppInsightsService) { 
    appInsightsService.logPageView('MainPage');
  }

}
