import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  nome: string = '';
  telefone: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  cadastrar() {
    const usuario = {
      nome: this.nome,
      telefone: this.telefone,
      senha: this.senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }
}
