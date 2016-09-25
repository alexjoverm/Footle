import { ModuleWithProviders }  from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent }  from './dashboard/dashboard.component'

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
]

export const customerRouting: ModuleWithProviders =
  RouterModule.forChild(routes)
