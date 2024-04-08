import { Component, OnInit, ViewChild } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, PopupOpenEventArgs, ScheduleComponent as scheduleComponent } from '@syncfusion/ej2-angular-schedule';

declare var $: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],//necessário para colocar as formas de visualização do schedule
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {

  @ViewChild('schedule') scheduleObj: scheduleComponent;

  public data: object[] = [{ 
    Id: 1, 
    Subject: 'Teste de agendamento', 
    StartTime: new Date(2019,4,10, 13,0), 
    EndTime: new Date(2019,4,10, 13,30) 
    }];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };

  public selectedDate: Date = new Date();
  public showQuickInfo: boolean = true;
  
  public testText: string = null;
  public dataStartTime: any;
  public dataEndTime: any;

  public testAgenda: PopupOpenEventArgs;

  popupOpen(args: PopupOpenEventArgs){
    if( args.type === 'Editor' )
    {
      args.cancel = true;
    }
    console.log(this.eventSettings)
    this.testAgenda = args;
    this.dataStartTime = args.data;

    $('#modalAgendamento').modal('show');

  }

  salvarAgendamento(){
    this.data.push({ Id: 2, Subject: this.testText, StartTime: this.dataStartTime.StartTime, EndTime: this.dataStartTime.EndTime});

    this.eventSettings.dataSource = this.data;
    this.scheduleObj.refresh();

    console.log(this.eventSettings);
  }

}
