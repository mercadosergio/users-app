import { Component, inject, signal } from '@angular/core';
import { GithubUsersService } from '../../../../core/services/github-users.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private githubUsersService = inject(GithubUsersService);
  searchTerm = signal('');

  usersResource = rxResource({
    stream: () => {
      const username = this.searchTerm();
      return this.githubUsersService.getUsersByParams({ username });
    },
    defaultValue: { items: [], total_count: 0, incomplete_results: false },
  });

  searchUsers(searchValue: string) {
    this.searchTerm.set(searchValue);
    this.usersResource.reload();
  }
}
