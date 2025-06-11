import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nome: string = '';
  senha: string = '';

  constructor(private router: Router) {}

 adminLogin: boolean = false;

  login() {
    if (this.adminLogin) {
      if (this.nome === 'admin' && this.senha === '1234') {
        localStorage.setItem('adminLogado', 'true');
        this.router.navigate(['/admin']);
      } else {
        alert('Administrador inválido!');
      }
      return;
    }

    // Login de cliente 
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (this.nome === usuarioSalvo.nome && this.senha === usuarioSalvo.senha) {
      localStorage.setItem('usuarioLogado', this.nome);
      this.router.navigate(['/home']);
    } else {
      alert('Nome ou senha inválidos!');
    }
  }
}
