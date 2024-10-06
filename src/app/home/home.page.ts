import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService, EventApp } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../pages/modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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

