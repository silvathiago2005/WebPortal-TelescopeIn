import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() widgets: any[];
  @Input() widget: any;
  @Input() tipoGrafico: number = null;
  @Input() idQuestionario: number = null;
  @Input() IDTipoGrafico: number = null;
  @Input() dataInicial?: Date = null;
  @Input() dataFinal?: Date = null;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() { }

  setTipoGrafico(number: number){
    this.tipoGrafico = number
    for( let x in this.widgets )
    {
      if( this.widgets[x].title == this.widget.title )
      {
        this.widgets[x].tipoGrafico = number
      }
    }
    this.dashboardService.setPosicao(this.widgets)
    
  }

}
