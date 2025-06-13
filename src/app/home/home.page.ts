import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class ServicosPage implements OnInit {
  nomeUsuario: string = '';
  servicosDisponiveis: any[] = [];

  ngOnInit() {
    this.nomeUsuario = localStorage.getItem('usuarioLogado') || '';
    const dados = localStorage.getItem('servicos');
    this.servicosDisponiveis = dados ? JSON.parse(dados) : [];
  }

  services = [
    { name: 'Corte Masculino', selected: false },
    { name: 'Limpeza de Rosto', selected: false },
    { name: 'Sobrancelha', selected: false },
    { name: 'Barba', selected: false }
  ];

  avancar() {
    const selecionados = this.services.filter(s => s.selected);
    console.log('Serviços selecionados:', selecionados);
  }
}
