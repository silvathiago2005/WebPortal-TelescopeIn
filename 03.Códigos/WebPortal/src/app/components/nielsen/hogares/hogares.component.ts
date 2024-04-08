import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { PagedListService } from 'ng-paged-list/paged-list.service';
import { GetAllControle } from '../../../app.api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-hogares',
  templateUrl: './hogares.component.html'
})

export class HogaresComponent implements OnInit, OnDestroy {
  @ViewChild("search")
  
  grid: PagedListService
  isalive: boolean = true
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(this.currentYear - 2, this.currentMonth - 11, 30).toDateString();
  public maxDate: Object = new Date(this.currentYear, this.currentMonth, 30).toDateString();
  public startDate: Date = new Date(this.minDate.toString())
  public endDate: Date = new Date()
  
  public searchElementRef: ElementRef
  dateFormat: string = "dd/MM/yyyy"

  filter: any = {
    idCliente: <number>null,
    dateInicio: <string>null,
    dateFim: <String>null
  }

  constructor(private translate: TranslateService, private spinner: NgxSpinnerService, private auth: AuthService) {
    this.grid = new PagedListService({
      url: `${GetAllControle}`,
      pageSize: 10,
      sortField: 'DtGeracao',
      sortType: 'asc',
      isAlive: this.isalive
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.isalive = false
  }
}
