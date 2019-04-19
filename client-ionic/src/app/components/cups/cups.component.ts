import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import * as api from '../../services';
import { EditModalCupsComponent } from '../modal/edit-modal-cups/edit-modal-cups.component';
import { AddModalCupsComponent } from '../modal/add-modal-cups/add-modal-cups.component';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.css']
})
export class CupsComponent implements OnInit {

  cups: any[];

  constructor(private cupsService: api.CupsService,  private modalCtrl : ModalController, private alertController: AlertController) { }

  ngOnInit() {
    this.cupsService.getCups().subscribe(response => this.cups = response.cup);
  }

  async openEditModal(event: Event, cup) {

    event.stopPropagation();
    event.preventDefault();

    const modal = await this.modalCtrl.create({
      component: EditModalCupsComponent,
      componentProps: cup
    });

    return await modal.present();

  }
  async delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({
      
        header: 'Alert',
        subHeader: 'Delete cup?',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            role: 'yes',
           handler: () => {
              console.log('Yes');
            }
          }, {
            text: 'No',
            role: 'no',
            handler: () => {
              console.log('No');
            }
          }
        ]
      
    });

    await alert.present();
  }


  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalCupsComponent
    });

    return await modal.present();
  }

}
