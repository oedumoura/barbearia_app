import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: any[] = [];

  ngOnInit() {
    this.produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
  }

  adicionar() {
    this.produtos.push({ nome: '', preco: 0, quantidade: 0 });
  }

  remover(i: number) {
    this.produtos.splice(i, 1);
  }

  salvar() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
    alert('Produtos atualizados!');
  }
}
