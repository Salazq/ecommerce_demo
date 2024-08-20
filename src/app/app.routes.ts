import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./books/features/book-shell.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
