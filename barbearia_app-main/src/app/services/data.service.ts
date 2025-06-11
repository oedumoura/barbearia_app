import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    return await this._storage?.get(key);
  }

  async initializeData() {
    const barbers = [
      { id: 1, name: 'João', specialty: 'Corte masculino' },
      { id: 2, name: 'Carlos', specialty: 'Barba e cabelo' },
      { id: 3, name: 'Marcos', specialty: 'Corte infantil' }
    ];
    await this.set('barbers', barbers);

    const services = [
      { id: 1, name: 'Corte masculino', price: 30, duration: 30 },
      { id: 2, name: 'Corte e barba', price: 50, duration: 60 }
    ];
    await this.set('services', services);

    const appointments: { id: number; barberId: number; serviceId: number; startTime: string }[] = [];
    await this.set('appointments', appointments);

    console.log('Dados iniciais inseridos no Storage!');
  }

  async remove(key: string) {
    await this._storage?.remove(key);
  }

  async clear() {
    await this._storage?.clear();
  }
}
