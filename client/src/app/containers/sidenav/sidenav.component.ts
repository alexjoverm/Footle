import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import { MediumScreen } from 'utils/constants'
import { RootState } from 'store/reducers'
import { AppActions } from 'store/actions/app'

@Component({
  selector: 'ft-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  mode = null
  isBigScreen = false

  sidenavOpen$: Observable <boolean>
  isBigScreen$: Observable <boolean>
  size$: Observable<any>

  @ViewChild('sidenav') mdSidenavCmp

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

  /**
   * Set Sidenav open on state. This function is the callback
   * of the "open" and "close" events of the sidenav
   *
   * @param {boolean} value
   */
  setSidenavOpen(value: boolean) {
    this.store.dispatch(this.appActions.setSidenavOpen(value))
  }

  /**
   * Opens the actual sidenav by calling its API
   */
  open() {
    this.mdSidenavCmp.open()
  }

}
