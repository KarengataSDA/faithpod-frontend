import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('../../components/apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
  }

];
