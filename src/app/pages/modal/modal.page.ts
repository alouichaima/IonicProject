import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, EventApp } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id!: string; 
  event!: EventApp; 

  constructor(
    private dataService: DataService,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getEventById(this.id).subscribe(res => {
      this.event = res; 
      console.log(this.event);
    });
  }

  async deleteEvent() {
    if (this.event) {
      await this.dataService.deleteEvent(this.event); 
      this.modalCtrl.dismiss();
    }
  }

  async updateEvent() {
    await this.dataService.updateEvent(this.event);
    const toast = await this.toastCtrl.create({
      message: 'Event updated successfully.',
      duration: 2000
    });
    toast.present();
    this.modalCtrl.dismiss();  
  }



}
