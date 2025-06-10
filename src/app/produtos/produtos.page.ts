import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: any[] = [];
  reservas: any[] = [];
  cliente: string = '';

  ngOnInit() {
    this.cliente = localStorage.getItem('usuarioLogado') || 'Desconhecido';
    this.produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    this.reservas = JSON.parse(localStorage.getItem('reservas_' + this.cliente) || '[]');
  }

  reservarProduto(produto: any) {
    this.reservas.push(produto);
    localStorage.setItem('reservas_' + this.cliente, JSON.stringify(this.reservas));
    alert(`${produto.nome} reservado com sucesso!`);
  }
}
