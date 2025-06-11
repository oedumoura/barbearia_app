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

     if (!localStorage.getItem('produtos')) {
    const produtosIniciais = [
      { nome: 'Pente de Barba', preco: 15.90, quantidade: 10 },
      { nome: 'Pomada Modeladora', preco: 29.90, quantidade: 8 },
      { nome: 'Óleo para Barba', preco: 39.90, quantidade: 5 },
      { nome: 'Toalha Quente', preco: 9.90, quantidade: 15 },
      { nome: 'Navalhete Profissional', preco: 49.90, quantidade: 6 }
    ];
    localStorage.setItem('produtos', JSON.stringify(produtosIniciais));
  }
    this.produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    this.reservas = JSON.parse(localStorage.getItem('reservas_' + this.cliente) || '[]');
  }

  reservarProduto(produto: any) {
    this.reservas.push(produto);
    localStorage.setItem('reservas_' + this.cliente, JSON.stringify(this.reservas));
    alert(`${produto.nome} reservado com sucesso!`);
  }

  comprarProduto(produto: any) {
  const compras = JSON.parse(localStorage.getItem('compras_' + this.cliente) || '[]');
  compras.push(produto);
  localStorage.setItem('compras_' + this.cliente, JSON.stringify(compras));
  alert(`Compra realizada: ${produto.nome}`);
}

}
