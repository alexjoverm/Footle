import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriatpe action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class AppActions {
  static SET_WINDOW_SIZE  = 'SET_WINDOW_SIZE'
  static SET_BIG_SCREEN   = 'SET_BIG_SCREEN'
  static SET_SIDENAV_OPEN = 'SET_SIDENAV_OPEN'

  setWindowSize(): Action {
    return {
      type: AppActions.SET_WINDOW_SIZE,
      payload: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }

  setBigScreen(bigScreen: Boolean): Action {
    return {
      type: AppActions.SET_BIG_SCREEN,
      payload: bigScreen
    }
  }

  setSidenavOpen(open: Boolean): Action {
    return {
      type: AppActions.SET_SIDENAV_OPEN,
      payload: open
    }
  }
}
