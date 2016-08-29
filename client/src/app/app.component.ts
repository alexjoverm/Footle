import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { MediumScreen } from 'app/_shared/constants'

import { ApiService } from 'services/api.service'

import 'styles/app.scss'

@Component({
  selector: 'ft-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isBigScreen = false
  _sidenavOpened = false

  constructor(private api: ApiService) {
    // Do something with api
    Observable.fromEvent(window, 'resize')
      .map(() => ({
        width: window.innerWidth,
        height: window.innerHeight
      }))
      .subscribe(size => {
        this.isBigScreen = window.innerWidth > MediumScreen
      })
  }

  ngOnInit() {
    this.isBigScreen = window.innerWidth > MediumScreen
    this._sidenavOpened = this.isBigScreen
  }

  set sidenavOpened(value) {
    console.log(value)
    this._sidenavOpened = value
  }

}
