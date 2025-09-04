import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GithubUser, UserDetail } from '../models/interfaces/github-user.interface';
import { forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubUsersService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.github.com/search/users';

  getUsersByParams(params: { username: string }) {
    const url = new URL(this.apiUrl);
    if (params.username) {
      url.searchParams.set('q', params.username);
    }
    url.searchParams.set('per_page', '10');

    return this.http.get<{ items: GithubUser[]; total_count: number; incomplete_results: boolean }>(
      url.toString()
    );
  }

  getUser(username: string) {
    const url = `https://api.github.com/users/${username}`;
    return this.http.get<UserDetail>(url);
  }

  getUserByUsername(username: string) {
    return this.http
      .get<GithubUser>(`https://api.github.com/search/users?q=${username}`)
      .pipe(map((resp: any) => resp.items[0]));
  }
}
