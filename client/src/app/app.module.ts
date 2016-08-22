import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http'
import { FormsModule }    from '@angular/forms'

import { MdCardModule }    from '@angular2-material/card'
import { MdButtonModule }  from '@angular2-material/button'
import { MdSidenavModule } from '@angular2-material/sidenav'

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
export class AppModule {}
