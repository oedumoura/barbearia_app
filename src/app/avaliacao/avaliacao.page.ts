import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage {
  avaliacao = {
    nome: '',
    barbeiro: '', 
    nota: 0, 
    comentario: ''
  };

  constructor(private alertController: AlertController) {}

  definirNota(nota: number) {
    this.avaliacao.nota = nota; 
  }

  async enviarAvaliacao() {
    if (!this.avaliacao.nome || !this.avaliacao.barbeiro || this.avaliacao.nota === 0) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios!',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Obrigado!',
      message: `Sua avaliação do barbeiro ${this.avaliacao.barbeiro} foi enviada com sucesso.`,
      buttons: ['OK']
    });
    await alert.present();

    this.avaliacao = {
      nome: '',
      barbeiro: '',
      nota: 0,
      comentario: ''
    };
  }
}
