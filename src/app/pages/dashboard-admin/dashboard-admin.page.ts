import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService, EventApp } from 'src/app/services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage  {

  events: EventApp[] = []; 

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.dataService.getEvents().subscribe(res => {
      this.events = res; 
      this.cd.detectChanges();
    });
  }

  async addEvent() {
    const alert = await this.alertCtrl.create({
      header: 'Add Event',
      cssClass:'custom-alert',
      inputs: [
        {
          name: 'name',
          placeholder: 'Event Name',
          type: 'text'
        },
        {
          name: 'date',
          placeholder: 'Event Date (e.g., 2023-12-31)',
          type: 'text' 
        },
        {
          name: 'description',
          placeholder: 'Event Description',
          type: 'textarea'
        },
        {
          name: 'imageUrl',
          placeholder: 'Image URL',
          type: 'text' 
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: res => {
            
            this.dataService.addEvent({
              name: res.name,
              date: res.date,
              description: res.description,
              imageUrl: res.imageUrl
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async openEvent(event: EventApp) {
    const modal = await this.modalCtrl.create({
      component: ModalPage, 
      componentProps: { id: event.id },
      cssClass: 'small-modal'
    });

    await modal.present();
  }
}

