import { Component, ViewChild } from '@angular/core'
import { SidenavComponent } from 'containers/sidenav/sidenav.component'
import { Observable } from 'rxjs/Observable'

import 'styles/app.scss'

@Component({
  selector: 'ft-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild(SidenavComponent) sidenavCmp:SidenavComponent

  constructor() {}

  openSidenav() {
    console.log(SidenavComponent)
    // console.log(this.sidenavCmp)
    this.sidenavCmp.open()
  }

}
