import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barbeiros',
  templateUrl: './barbeiros.page.html',
  styleUrls: ['./barbeiros.page.scss'],
})
export class BarbeirosPage implements OnInit {
  profissionais: string[] = [];
  novoBarbeiro: string = '';  // <<< Adicione esta linha

  ngOnInit() {
    this.profissionais = JSON.parse(localStorage.getItem('profissionais') || '[]');
  }

  adicionar() {
    if (this.novoBarbeiro.trim()) {
      this.profissionais.push(this.novoBarbeiro.trim());
      this.novoBarbeiro = '';
    }
  }

  remover(i: number) {
    this.profissionais.splice(i, 1);
  }

  salvar() {
    localStorage.setItem('profissionais', JSON.stringify(this.profissionais));
    alert('Profissionais salvos!');
  }
}
