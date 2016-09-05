import { NgModule, ApplicationRef }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http'
import { FormsModule }    from '@angular/forms'

import { StoreModule } from '@ngrx/store'

import { removeNgStyles, createNewHosts } from '@angularclass/hmr'

import { MdCardModule }    from '@angular2-material/card'
import { MdButtonModule }  from '@angular2-material/button'
import { MdSidenavModule } from '@angular2-material/sidenav'
import { MdListModule }    from '@angular2-material/list'
import { MdToolbarModule } from '@angular2-material/toolbar'

// Store
import { rootReducer } from 'store/reducers'
import { AppActions } from 'store/actions/app'

// Components
import { AppComponent }   from './app.component'
import { HomeComponent }  from 'containers/home/home.component'
import { AboutComponent } from 'containers/about/about.component'
import { SidenavComponent } from 'containers/sidenav/sidenav.component'
import { ToolbarComponent } from 'containers/toolbar/toolbar.component'

import { ApiService }     from 'services/api.service'
import { routing }        from './app.routing'

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer),
    BrowserModule,
    HttpModule,
    FormsModule,

    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,

    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  providers: [
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
