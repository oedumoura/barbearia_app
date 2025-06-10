import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  agendamentos: any[] = [];
  filtroData: string = '';
  filtroProfissional: string = '';
  profissionais: string[] = [];

  ngOnInit() {
    this.atualizarDados();
  }

  atualizarDados() {
    this.agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    this.profissionais = JSON.parse(localStorage.getItem('profissionais') || '[]');
  }

  get agendamentosFiltrados() {
    return this.agendamentos.filter((a: any) => {
      const porData = this.filtroData ? a.data === this.filtroData : true;
      const porBarbeiro = this.filtroProfissional ? a.barbeiro === this.filtroProfissional : true;
      return porData && porBarbeiro;
    });
  }

  excluir(index: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir este agendamento?');
    if (confirmacao) {
      this.agendamentos.splice(index, 1);
      localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));
      this.atualizarDados();
    }
  }
}
