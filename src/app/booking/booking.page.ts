import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

interface Appointment {
  date: string;
  time: string;
  barber: string;
  service: {
    name: string;
    price: number;
    duration: number;
  };
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage {
  date: string = '';
  time: string = '';
  barber: string = '';
  service: any = null;
  availableTimes: string[] = [];
  barbers: string[] = ['João', 'Carlos', 'Marcos'];
  services: any[] = [
    { name: 'Corte', price: 30, duration: 30 },
    { name: 'Barba', price: 20, duration: 30 },
    { name: 'Corte e Barba', price: 60, duration: 60 },
  ];

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  promotions: any[] = [
    { name: 'Semana do cliente', discount: 10 },
  ];
  
  selectedPromotion: any = null;
  async onServiceChange() {
    await this.updateAvailableTimes();
  }

  async updateAvailableTimes() {
    const appointments: Appointment[] = (await this.dataService.get('appointments')) || [];
  
    const allTimes = this.generateTimeSlots('08:00', '19:00');
  
    const conflictingTimes = appointments
      .filter((a: Appointment) => a.barber === this.barber && a.date === this.date)
      .map((a: Appointment) => this.getBlockedTimes(a.time, a.service.duration))
      .reduce((acc, val) => acc.concat(val), []);
  
    this.availableTimes = allTimes.filter(time => !conflictingTimes.includes(time));
  }
  
  
  
  

  generateTimeSlots(start: string, end: string): string[] {
    const times = [];
    let [hour, minute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
  
    while (hour < endHour || (hour === endHour && minute < endMinute)) {
      times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      minute += 30;
      if (minute === 60) {
        hour += 1;
        minute = 0;
      }
    }
    return times;
  }
  

  getBlockedTimes(startTime: string, duration: number): string[] {
    const blockedTimes = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
  
    // Calcula o horário final do agendamento
    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(startDate.getTime() + duration * 60000);
  
    let currentTime = new Date(startDate);
    while (currentTime < endDate) {
      const h = currentTime.getHours().toString().padStart(2, '0');
      const m = currentTime.getMinutes().toString().padStart(2, '0');
      blockedTimes.push(`${h}:${m}`);
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Incrementa em 30 minutos
    }
  
    return blockedTimes;
  }
  
  

  async validateTime() {
    await this.updateAvailableTimes();
    if (!this.availableTimes.includes(this.time)) {
      const alert = await this.alertCtrl.create({
        header: 'Horário Inválido',
        message: 'O horário selecionado está indisponível. Por favor, escolha outro.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async confirmAppointment() {
    if (!this.date || !this.time || !this.barber || !this.service) {
      const alert = await this.alertCtrl.create({
        header: 'Dados Incompletos',
        message: 'Por favor, preencha todos os campos para agendar.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const newAppointment: Appointment = {
      date: this.date,
      time: this.time,
      barber: this.barber,
      service: this.service,
    };

    const appointments: Appointment[] = (await this.dataService.get('appointments')) || [];
    appointments.push(newAppointment);
    await this.dataService.set('appointments', appointments);

    const alert = await this.alertCtrl.create({
      header: 'Agendamento Confirmado',
      message: 'Seu agendamento foi realizado com sucesso!',
      buttons: ['OK'],
    });
    await alert.present();

    this.navCtrl.navigateBack('/home');
  }
}
