import { ModuleWithProviders }  from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent }  from './home/home.component'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent}
]

export const baseRouting: ModuleWithProviders =
  RouterModule.forChild(routes)
