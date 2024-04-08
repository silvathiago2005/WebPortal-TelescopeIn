import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';
import { GridsterComponent, IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {

  user: Login = null

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.isLoggedin()
  }

}
