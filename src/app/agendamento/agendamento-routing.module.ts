import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoPage } from './agendamento.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentoPageRoutingModule {}
