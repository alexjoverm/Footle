import { Component, OnInit} from '@angular/core'
import { Store } from '@ngrx/store'

import { RootState } from 'store/reducers'
import { AppActions } from 'store/actions/app'

@Component({
  selector: 'ft-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appointments$

  constructor(private store: Store<RootState>, private appActions: AppActions) {
    this.appointments$ = this.store
      .select(s => s.app.currentUser)
      .filter(s => s !== null)
      .map(user => user.appointments)
  }

  ngOnInit() {
    // this.store.dispatch(this.appActions.setWindowSize())
  }

}
