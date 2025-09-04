import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GithubUsersService } from '../services/github-users.service';
import { catchError, map, of } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const userScoreGuard: CanActivateFn = (route, state) => {
  const githubService = inject(GithubUsersService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const username = route.paramMap.get('login');

  if (!username) {
    router.navigate(['/']);
    return of(false);
  }

  return githubService.getUserByUsername(username).pipe(
    map((user) => {
      if (user && user.score >= 30.0) {
        return true;
      } else {
        router.navigate(['/']);
        toastService.show(
          'Acceso denegado: El usuario no cumple con el puntaje mínimo requerido.',
          'error'
        );

        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
