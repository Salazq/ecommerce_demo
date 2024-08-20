import { Routes } from '@angular/router';

export default [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./book-dashboard.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./book-create.component'),
      },
      {
        path: 'edit/:bookId',
        loadComponent: () =>
          import('./book-create.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
] as Routes;
