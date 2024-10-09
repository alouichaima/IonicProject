import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailGoogleLoginPage } from './email-google-login.page';

const routes: Routes = [
  {
    path: '',
    component: EmailGoogleLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailGoogleLoginPageRoutingModule {}
