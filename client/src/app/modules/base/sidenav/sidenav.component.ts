import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store'

import { MediumScreen } from 'utils/constants'
import { RootState } from 'store/reducers'
import { AppActions } from 'store/actions/app'

@Component({
  selector: 'ft-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  mode = null
  isBigScreen = false

  isBigScreen$: Observable<boolean>
  size$: Observable<any>

  resizeSubs: Subscription
  isBigScreenSubs: Subscription
  sizeSubs: Subscription

  @ViewChild('sidenav') mdSidenavCmp

  constructor(private store: Store<RootState>, private appActions: AppActions) {
    this.resizeSubs = Observable.fromEvent(window, 'resize')
      .debounceTime(200) // Don't trigger continuous actions
      .subscribe(size => {
        this.store.dispatch(this.appActions.setWindowSize())
      })

    // size Observable
    this.size$ = store.select(s => s.app.windowSize)
    this.sizeSubs = this.size$.subscribe(size => {
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
    this.isBigScreenSubs = this.isBigScreen$.subscribe(isBigScreen => {
      this.mode = isBigScreen ? 'side' : 'over'
      this.isBigScreen = isBigScreen
      console.log(this.mode)
      console.log(this.isBigScreen)

      // When setBigScreen changes, change sidenavOpen
      this.store.dispatch(this.appActions.setSidenavOpen(
        isBigScreen
      ))
    })
  }

  ngOnInit() {
    this.store.dispatch(this.appActions.setWindowSize())
  }

  ngOnDestroy() {
    this.resizeSubs.unsubscribe()
    this.isBigScreenSubs.unsubscribe()
    this.sizeSubs.unsubscribe()
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
