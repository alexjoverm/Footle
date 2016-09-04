import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { MediumScreen } from 'utils/constants'

import { RootState } from 'store/reducers' // @todo REFACTOR!
import { AppActions } from 'store/actions/app'

import 'styles/app.scss'

@Component({
  selector: 'ft-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mode = null
  isBigScreen = false

  sidenavOpen$: Observable <boolean>
  isBigScreen$: Observable <boolean>
  size$: Observable<any>

  constructor(private store: Store<RootState>, private appActions: AppActions) {
    Observable.fromEvent(window, 'resize')
      .debounceTime(200) // Don't trigger continuous actions
      .subscribe(size => {
        this.store.dispatch(this.appActions.setWindowSize())
      })

      // size Observable
      this.size$ = store.select(s => s.app.windowSize)
      this.size$.subscribe(size => {
        // setBigScreen when surpases the breakpoint
        const newBigScreen = size.width > MediumScreen
        if (this.isBigScreen !== newBigScreen) {
          this.store.dispatch(this.appActions.setBigScreen(
            newBigScreen
          ))
        }
      })

      // isBigScreen Observable
      this.isBigScreen$ = store.select(s => s.app.isBigScreen)
      this.isBigScreen$.subscribe(isBigScreen => {
        this.mode = isBigScreen ? 'side' : 'over'
        this.isBigScreen = isBigScreen
        // When setBigScreen changes, change sidenavOpen
        this.store.dispatch(this.appActions.setSidenavOpen(
          isBigScreen
        ))
      })
  }

  ngOnInit() {
    this.appActions.setWindowSize()
  }

  sidenavOpened(value) {
    this.store.dispatch(this.appActions.setSidenavOpen(value))
  }

}
