import { Component, ViewChild } from '@angular/core'
import { SidenavComponent } from 'modules/base/sidenav/sidenav.component'

import 'styles/app.scss'

@Component({
  selector: 'ft-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild(SidenavComponent) sidenavCmp: SidenavComponent

  constructor() {}

  openSidenav() {
    this.sidenavCmp.open()
  }

}
