import { Component, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  faSearch = faMagnifyingGlass;
  searchValue = signal('');
  sendValue = output<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchValue.set(input.value);
  }

  onSearch() {
    this.sendValue.emit(this.searchValue());
  }
}
