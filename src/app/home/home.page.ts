import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Participation } from 'model/Participation';
import { DataService, EventApp } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: EventApp[] = [];
  userId: string | null = null;

  constructor(
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private dataService: DataService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getEvents().subscribe((res) => {
      this.events = res;
    });

    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  async participate(eventId: string) {
    if (!this.userId) {
      console.error('User not logged in');
      return;
    }

    const participation: Participation = {
      eventId: eventId,
      userId: this.userId,
      timestamp: new Date(),
    };

    try {
      await this.dataService.addParticipation(participation);
      console.log('Participation added successfully');
      await this.presentToast('Participation added successfully!');
    } catch (error) {
      console.error('Error adding participation: ', error);
      await this.presentToast('Error adding participation.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success', 
    });
    await toast.present();
  }

  async signOut() {
    try {
      await this.ngFireAuth.signOut();
      console.log('Signed out successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }
}
