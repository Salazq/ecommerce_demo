import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./books/features/book-dashboard.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./books/features/book-create.component'),
      },
      {
        path: 'edit/:bookId',
        loadComponent: () =>
          import('./books/features/book-create.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
