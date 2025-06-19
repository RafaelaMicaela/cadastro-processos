import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'partes', pathMatch: 'full' },
  {
    path: 'partes',
    loadComponent: () => import('./features/partes/pages/parte-list.component').then(m => m.ParteListComponent)
  },
  {
    path: 'processos',
    loadComponent: () => import('./features/processos/pages/processo-list.component').then(m => m.ProcessoListComponent)
  },
  { path: '**', redirectTo: 'partes' }
];
