import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GithubUsersService } from '../../../../core/services/github-users.service';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [DatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export default class UserDetailComponent {
  private githubUserService = inject(GithubUsersService);
  private location = inject(Location);

  login = input.required<string>();

  goBack() {
    this.location.back();
  }

  userResource = rxResource({
    params: () => ({ login: this.login() }),
    stream: ({ params }) => this.githubUserService.getUser(params.login),
  });
}
