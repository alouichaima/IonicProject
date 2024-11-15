import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FirestoreModule } from '@angular/fire/firestore'; // Import Firestore module

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FirestoreModule,AngularFireModule,AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
