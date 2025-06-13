import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  servicos: any[] = [];

  // Campos da promoção
  servicoSelecionadoIndex: number | null = null;
  desconto: number = 0;
  inicio: string = '';
  fim: string = '';

  // Campos para novo serviço
  novoServicoNome: string = '';
  novoServicoPreco: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.servicos = JSON.parse(localStorage.getItem('servicos') || '[]');
  }

  adicionar() {
    if (this.novoServicoNome && this.novoServicoPreco !== null) {
      this.servicos.push({
        nome: this.novoServicoNome,
        preco: this.novoServicoPreco,
        promocao: null
      });
      this.novoServicoNome = '';
      this.novoServicoPreco = null;
    }
  }

  remover(i: number) {
    this.servicos.splice(i, 1);
  }

  salvar() {
    localStorage.setItem('servicos', JSON.stringify(this.servicos));
    alert('Serviços atualizados!');
    this.router.navigate(['/cliente/home']);
  }


  salvarPromocao() {
    if (this.servicoSelecionadoIndex !== null) {
      this.servicos[this.servicoSelecionadoIndex].promocao = {
        desconto: this.desconto,
        inicio: this.inicio,
        fim: this.fim
      };
      this.servicoSelecionadoIndex = null;
      this.desconto = 0;
      this.inicio = '';
      this.fim = '';
    }
  }

  cancelarPromocao() {
    this.servicoSelecionadoIndex = null;
    this.desconto = 0;
    this.inicio = '';
    this.fim = '';
  }
}
