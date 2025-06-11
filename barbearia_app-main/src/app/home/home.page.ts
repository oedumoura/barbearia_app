import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class ServicosPage implements OnInit {
  nomeUsuario: string = '';

  ngOnInit() {
    this.nomeUsuario = localStorage.getItem('usuarioLogado') || '';
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
