import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ApiService {
  private baseUrl = 'http://localhost:3000'

  constructor(private http:Http) {}

  public searchUsers(term) {
    return this.http.get(`${this.baseUrl}/users`, {
      search: new URLSearchParams(`q=${term}`)
    })
      .map(res => res.json())
  }
}
