import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GithubUsersService } from '../services/github-users.service';
import { catchError, map, of } from 'rxjs';

export const userScoreGuard: CanActivateFn = (route, state) => {
  const githubService = inject(GithubUsersService);
  const router = inject(Router);

  const username = route.paramMap.get('login');

  if (!username) {
    router.navigate(['/']);
    return of(false);
  }

  return githubService.getUserByUsername(username).pipe(
    map((user) => {
      if (user && user.score >= 30.0) {
        console.log('es mayor o igual a 30');

        return true;
      } else {
        router.navigate(['/']);
        console.log('es menor a 30');
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
