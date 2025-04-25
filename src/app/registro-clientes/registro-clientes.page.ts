import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.page.html',
  styleUrls: ['./registro-clientes.page.scss'],
})
export class RegistroClientesPage {
  cliente = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
  };

  constructor(private storage: Storage, private alertCtrl: AlertController) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create(); // Inicializa o armazenamento local
  }

  async registrarCliente() {

    if (!this.cliente.nome || !this.cliente.email || !this.cliente.telefone || !this.cliente.senha) {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos antes de salvar.',
        buttons: ['OK'],
      });

      await alert.present();
      return; // Interrompe o processo caso a validação falhe
    }
    // Salva os dados no armazenamento local
    await this.storage.set('cliente', this.cliente);

    // Exibe uma mensagem de sucesso
    const alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: 'Dados do cliente salvos com sucesso!',
      buttons: ['OK'],
    });
    await alert.present();

    // Reseta o formulário após salvar
    this.cliente = {
      nome: '',
      email: '',
      telefone: '',
      senha: '',
    };
  }
}
