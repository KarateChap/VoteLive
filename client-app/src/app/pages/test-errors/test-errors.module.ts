import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './test-errors.component';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../shared/modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    component: TestErrorsComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
];

@NgModule({
  declarations: [TestErrorsComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class TestErrorsModule {}
