import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarbeirosPage } from './barbeiros.page';

const routes: Routes = [
  {
    path: '',
    component: BarbeirosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbeirosPageRoutingModule {}

