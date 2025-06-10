import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  nomeUsuario: string = '';
  meusAgendamentos: any[] = [];
  reservas: any[] = [];

  ngOnInit() {
    this.nomeUsuario = localStorage.getItem('usuarioLogado') || 'Desconhecido';

    const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    this.meusAgendamentos = agendamentos.filter((a: any) => a.cliente === this.nomeUsuario);

    this.reservas = JSON.parse(localStorage.getItem('reservas_' + this.nomeUsuario) || '[]');
  }
}
