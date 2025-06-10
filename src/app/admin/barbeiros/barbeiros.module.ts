import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BarbeirosPageRoutingModule } from './barbeiros-routing.module';
import { BarbeirosPage } from './barbeiros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbeirosPageRoutingModule
  ],
  declarations: [BarbeirosPage]
})
export class BarbeirosPageModule {}