import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import env from 'app/env'

@Injectable()
export class ApiService {
  private baseUrl  = env.baseUrl
  private userRole = env.userRole

  constructor(private http:Http) {}

  /**
   * Search (for now customers)
   * @param {string} term
   */
  public search(term) {
    return this.http.get(`${this.baseUrl}/customers`, {
      search: new URLSearchParams(`q=${term}`)
    })
      .map(res => res.json())
  }

  /**
   * Gets the FAKE current user (the supposedly loggedin)
   */
  public getCurrentUser() {
    return this.http.get(`${this.baseUrl}/${this.userRole}s`, {
      search: new URLSearchParams('_embed=appointments')
    })
      .map(res => res.json())
      .map(users => users[0])
  }

}
