import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  agendamentos: any[] = [];
  agendamentosFiltrados: any[] = [];

  filtroData: string = '';
  filtroBarbeiro: string = '';
  barbeiros: string[] = [];

  ngOnInit() {
    this.carregarAgendamentos();
    this.carregarBarbeiros();
  }

  carregarAgendamentos() {
    this.agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    this.aplicarFiltros();
  }

  carregarBarbeiros() {
    this.barbeiros = JSON.parse(localStorage.getItem('profissionais') || '[]');
  }
  
  aplicarFiltros() {
    let dataFormatada = '';
    if (this.filtroData) {
      const data = new Date(this.filtroData);
      dataFormatada = data.toISOString().split('T')[0]; // '2025-06-20'
    }

    this.agendamentosFiltrados = this.agendamentos.filter(ag => {
      const mesmaData = this.filtroData ? ag.data === dataFormatada : true;
      const mesmoBarbeiro = this.filtroBarbeiro ? ag.barbeiro === this.filtroBarbeiro : true;
      return mesmaData && mesmoBarbeiro;
    });
  }


  


  limparFiltros() {
    this.filtroData = '';
    this.filtroBarbeiro = '';
    this.aplicarFiltros();
  }

  excluir(index: number) {
    const originalIndex = this.agendamentos.findIndex(a =>
      a.data === this.agendamentosFiltrados[index].data &&
      a.hora === this.agendamentosFiltrados[index].hora &&
      a.barbeiro === this.agendamentosFiltrados[index].barbeiro
    );

    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      this.agendamentos.splice(originalIndex, 1);
      localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos));
      this.aplicarFiltros();
    }
  }
}
