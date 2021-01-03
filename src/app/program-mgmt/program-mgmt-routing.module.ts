import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramMgmtPage } from './program-mgmt.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramMgmtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramMgmtPageRoutingModule {}
