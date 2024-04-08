import { OnInit, Component } from "@angular/core";

@Component({
    selector: 'app-perguntas',
    templateUrl: './perguntas.component.html'
})

export class PerguntaComponent implements OnInit {
    
    constructor() { }

    ngOnInit() { }

    perguntas: any[];

}