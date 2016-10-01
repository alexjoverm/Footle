import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import env from 'app/env'

@Injectable()
export class UsersApi {
  private baseUrl  = env.baseUrl
  private userRole = env.userRole

  constructor(private http:Http) {}

  /**
   * Gets the FAKE current user (the supposedly loggedin)
   */
  public getCurrentUser() {

    return this.http.get(`${this.baseUrl}/${this.userRole}s`, {
      search: new URLSearchParams('_embed=appointments')
    })
      .map(res => res.json())
      .map(users => users[env.currentUser])
  }

}
