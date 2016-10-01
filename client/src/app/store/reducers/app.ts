import { Observable } from 'rxjs/Observable'
import { Action } from '@ngrx/store'

import { AppActions } from '../actions/app'


export interface AppState {
  windowSize: { width: number, height: number },
  isBigScreen: boolean,
  isOpen: boolean
}

const initialState: AppState = {
  windowSize: { width: 0, height: 0 },
  isBigScreen: false,
  isOpen: false
}


export const appReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {

    case AppActions.SET_WINDOW_SIZE: {
      const windowSize = action.payload
      return Object.assign({}, state, { windowSize })
    }
    case AppActions.SET_BIG_SCREEN: {
      const isBigScreen = action.payload
      return Object.assign({}, state, { isBigScreen })
    }
    case AppActions.SET_SIDENAV_OPEN: {
      const isOpen = action.payload
      return Object.assign({}, state, { isOpen })
    }

    default: {
      return state
    }
  }
}



/**
 * ********** SELECTORS **********
 *
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

// export function getBooks(bookIds: string[]) {
//   return (state$: Observable<BooksState>) => state$
//     .let(getBookEntities())
//     .map(entities => bookIds.map(id => entities[id]))
// }

// export function hasBook(id: string) {
//   return (state$: Observable<BooksState>) => state$
//     .select(s => s.ids.includes(id))
// }
