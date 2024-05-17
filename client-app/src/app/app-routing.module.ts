import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full',
  },
  {
    path: 'test-errors',
    loadChildren: () =>
      import('./pages/test-errors/test-errors.module').then(
        (mod) => mod.TestErrorsModule
      ),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'topics-list',
        loadChildren: () =>
          import('./pages/topics-list/topics-list.module').then(
            (mod) => mod.TopicsListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
