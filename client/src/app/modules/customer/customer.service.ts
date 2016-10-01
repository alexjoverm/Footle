import { Injectable } from '@angular/core'

import { AppointmentsApi } from 'services/api/appointments'

import { Store } from '@ngrx/store'
import { RootState } from 'store/reducers'
import { AppActions } from 'store/actions/app'

@Injectable()
export class CustomerService {

  constructor(
    private appointmentsApi: AppointmentsApi,
    private store: Store<RootState>,
    private appActions: AppActions
  ) {}

  public getAppointments() {
    this.appointmentsApi.getUserAppointments()
      .do(appointments => this.store.dispatch(
        this.appActions.
      ))
  }

}
