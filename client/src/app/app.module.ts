import { NgModule, ApplicationRef }       from '@angular/core'

import { StoreModule } from '@ngrx/store'
import { removeNgStyles, createNewHosts } from '@angularclass/hmr'

// Store
import { rootReducer } from 'store/reducers'
import { AppActions } from 'store/actions/app'

// Services
import { ApiService } from 'services/api.service'

// Containers
import { AppComponent } from './app.component'

// Routing
import { routing }      from './app.routing'

// Modules
import { BaseModule } from 'modules/base/base.module'

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer),
    routing,

    // Modules
    BaseModule,
  ],
  declarations: [
    // Containers
    AppComponent
  ],
  providers: [
    // Services
    ApiService,

    // Actions
    AppActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store)
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement)
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation)
    // remove styles
    removeNgStyles()
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts
  }
}
