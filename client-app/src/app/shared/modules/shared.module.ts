import { NgModule } from '@angular/core';
import { CardSkeleton } from '../components/skeletons/card-skeleton.component';
import { PrimeNgModule } from './primeng.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardSkeleton],
  imports: [PrimeNgModule, CommonModule],
  exports: [CardSkeleton],
})
export class SharedModule {}
