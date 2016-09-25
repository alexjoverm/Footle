import { Component, EventEmitter, Output, Input } from '@angular/core'
import { ApiService } from 'services/api.service'
import { Observable } from 'rxjs/Observable'
/**
 * TODO: refactor into a MultiSelect component
 */

export interface IOptions {
  title: string
}

@Component({
  selector: 'ft-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() autoComplete: boolean
  @Input() autoCompleteOptions: [IOptions]
  @Output() selectEvent = new EventEmitter()
  private results$
  private searchModel

  constructor(private apiService: ApiService) {
    // Do stuff
  }

  /**
   * Emits a search event for the parent component
   * @param {any} value
   */
  search(value) {
    console.log('search', value)
    this.results$ = this.apiService.search(value)
  }

  select(item) {
    this.selectEvent.emit(item)
    this.searchModel = item.name
    this.results$ = Observable.empty()
  }

}
