import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramPageRoutingModule } from './program-routing.module';

import { ProgramPage } from './program.page';
import { AccordionComponent } from "./../accordion/accordion.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramPageRoutingModule
  ],
  declarations: [ProgramPage, AccordionComponent]
})

export class ProgramPageModule {}
