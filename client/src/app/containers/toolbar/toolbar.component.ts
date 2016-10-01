import { Component, EventEmitter, Output } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import { RootState } from 'store/reducers'

@Component({
  selector: 'ft-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  isBigScreen$: Observable <boolean>
  @Output() openSidenavEvent = new EventEmitter()

  constructor(private store: Store<RootState>) {

    // isBigScreen Observable
    this.isBigScreen$ = store.select(s => s.app.isBigScreen)
  }

  openSidenav() {
    this.openSidenavEvent.emit()
  }
}
