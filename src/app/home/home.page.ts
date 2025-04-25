import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  appointments: any[] = [];

  constructor(private dataService: DataService, private alertController: AlertController) {}

  async ngOnInit() {
    await this.loadAppointments();
  }

  async ionViewWillEnter() {
    await this.loadAppointments();
  }

  async loadAppointments() {
    this.appointments = await this.dataService.get('appointments') || [];
  }

  async deleteAppointment(index: number) {
    // Confirmação do usuário antes de excluir
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza de que deseja excluir este agendamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: async () => {
            this.appointments.splice(index, 1);
  
            await this.dataService.set('appointments', this.appointments);
  
            const successAlert = await this.alertController.create({
              header: 'Agendamento Excluído',
              message: 'O agendamento foi removido com sucesso.',
              buttons: ['OK'],
            });
            await successAlert.present();
          },
        },
      ],
    });
    await alert.present();
  }
  

}
