import { NgModule }       from '@angular/core'
import { CommonModule }       from '@angular/common'

import { MdButtonModule }  from '@angular2-material/button'
import { MdInputModule }   from '@angular2-material/input'

// Containers
import { DashboardComponent } from './dashboard/dashboard.component'

// Components
import { customerRouting }        from './customer.routing'

@NgModule({
  imports: [
    CommonModule,

    MdButtonModule,
    MdInputModule,

    customerRouting
  ],
  declarations: [
    // Containers
    DashboardComponent
  ]
})
export class CustomerModule {
}
