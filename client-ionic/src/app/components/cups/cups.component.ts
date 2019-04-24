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
  showBar: boolean = true;

  constructor(private cupsService: api.CupsService,  private modalCtrl : ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Geting cups');
    this.cupsService.getCups().subscribe(response => {
      console.log(response);
      this.cups = response.cup;
      this.showBar = false;
    });
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

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalCupsComponent,
      componentProps: {
        cups: this.cups
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          const cup = data.data;
          this.cups.push(cup);
        }
    });

    return await modal.present();
  }

  async delete(event: Event, cup: any) {
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
              this.cupsService.deleteCup(cup._id).subscribe(response => {
                console.log(response);
                if (response.success) {
                  this.cups = this.cups.filter(elem =>  elem !== cup );
                }
              });
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

}
