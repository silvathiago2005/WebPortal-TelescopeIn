import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {

  private config: Microsoft.ApplicationInsights.IConfig = {
    instrumentationKey: '84382e2f-6edb-488f-b896-ed3721941c95'
  }

  constructor() {
    if(!AppInsights.config){
      AppInsights.downloadAndSetup(this.config);
    }
   }

   logPageView(name: string, url?: string, properties?:any, measurements?: any, duration?: number){
     appInsights.trackPageView(name, url, properties, measurements, duration);
   }

   logEvent(name: string, properties?: any, measurements?: any){
     appInsights.trackEvent(name, properties, measurements);
   }
}
