import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentosPage } from './agendamentos.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosPageRoutingModule {}