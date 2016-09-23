import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http'
import { FormsModule }    from '@angular/forms'

import { MdCardModule }    from '@angular2-material/card'
import { MdButtonModule }  from '@angular2-material/button'
import { MdSidenavModule } from '@angular2-material/sidenav'
import { MdListModule }    from '@angular2-material/list'
import { MdToolbarModule } from '@angular2-material/toolbar'
import { MdInputModule }   from '@angular2-material/input'

// Containers
import { HomeComponent }    from './home/home.component'
import { AboutComponent }   from './about/about.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { ToolbarComponent } from './toolbar/toolbar.component'

// Components
import { SearchBoxComponent } from 'components/search-box/search-box.component'
import { baseRouting }        from './base.routing'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,

    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,
    MdInputModule,

    baseRouting
  ],
  declarations: [
    // Containers
    HomeComponent,
    AboutComponent,
    SidenavComponent,
    ToolbarComponent,

    // Components
    SearchBoxComponent
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent
  ]
})
export class BaseModule {
}
