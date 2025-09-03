import { Routes } from '@angular/router';
import { userScoreGuard } from './core/guards/user-score-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./domains/home/pages/home/home.component'),
  },
  {
    path: 'user/:login',
    loadComponent: () => import('./domains/users/pages/user-detail/user-detail.component'),
    canActivate: [userScoreGuard],
  },
];
