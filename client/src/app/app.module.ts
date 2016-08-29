import { NgModule, ApplicationRef }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http'
import { FormsModule }    from '@angular/forms'

import { removeNgStyles, createNewHosts } from '@angularclass/hmr'

import { MdCardModule }    from '@angular2-material/card'
import { MdButtonModule }  from '@angular2-material/button'
import { MdSidenavModule } from '@angular2-material/sidenav'
import { MdToolbarModule } from '@angular2-material/toolbar'

import { AppComponent }   from './app.component'
import { HomeComponent }  from './home/home.component'
import { AboutComponent } from './about/about.component'
import { ApiService }     from 'services/api.service'
import { routing }        from './app.routing'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,

    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdSidenavModule,

    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
