import { Component, ViewChild } from '@angular/core'
import { SidenavComponent } from 'modules/base/sidenav/sidenav.component'
import { ApiService } from 'services/api.service'

import { Store } from '@ngrx/store'
import { RootState } from 'store/reducers'
import { AppActions } from 'store/actions/app'

import 'styles/app.scss'

@Component({
  selector: 'ft-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild(SidenavComponent) sidenavCmp: SidenavComponent

  constructor(private store: Store<RootState>, private appActions: AppActions, private apiService: ApiService) {
    this.apiService.getCurrentUser().subscribe(user => {
      this.store.dispatch(this.appActions.setCurrentUser(user))
    })
  }

  openSidenav() {
    this.sidenavCmp.open()
  }

}
