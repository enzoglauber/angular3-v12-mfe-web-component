import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BComponent } from './b.component';
import { BRoutingModule } from './b-routing.module';

@NgModule({
  declarations: [BComponent],
  imports: [
    CommonModule,
    BRoutingModule
  ]
})
export class BModule { }
