import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosPage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
