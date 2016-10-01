import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import env from 'app/env'

@Injectable()
export class AppApiAction {
  private baseUrl  = env.baseUrl

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

}
