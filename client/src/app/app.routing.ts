import { RouterModule, Routes } from '@angular/router'

import { HomeComponent }  from 'containers/home/home.component'
import { AboutComponent } from 'containers/about/about.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent}
]

export const routing = RouterModule.forRoot(routes)
