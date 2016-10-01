import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import env from 'app/env'

@Injectable()
export class AppointmentsApi {
  private baseUrl  = env.baseUrl
  private userRole = env.userRole

  constructor(private http:Http) {}

  public getUserAppointments() {
    return this.http.get(`${this.baseUrl}/${this.userRole}s/${env.currentUser}/appointments`, {
      search: new URLSearchParams('_expand=customer&_expand=employee')
    })
      .map(res => res.json())
  }

}
