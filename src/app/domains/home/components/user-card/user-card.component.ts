import { Component, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { GithubUser } from '../../../../core/models/interfaces/github-user.interface';

@Component({
  selector: 'app-user-card',
  imports: [RouterLinkWithHref],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  readonly user = input.required<GithubUser>();
}
