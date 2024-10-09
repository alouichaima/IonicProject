import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailGoogleLoginPageRoutingModule } from './email-google-login-routing.module';

import { EmailGoogleLoginPage } from './email-google-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailGoogleLoginPageRoutingModule
  ],
  declarations: [EmailGoogleLoginPage]
})
export class EmailGoogleLoginPageModule {}
