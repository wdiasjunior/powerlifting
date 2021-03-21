import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramMgmtPageRoutingModule } from './program-mgmt-routing.module';

import { ProgramMgmtPage } from './program-mgmt.page';
import { AccordionComponent } from "./../accordion/accordion.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramMgmtPageRoutingModule
  ],
  declarations: [ProgramMgmtPage, AccordionComponent]
})
export class ProgramMgmtPageModule {}
