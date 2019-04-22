import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import * as api from '../../services';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';
import { AddModalTeamsComponent } from '../modal/add-modal-teams/add-modal-teams.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
users = [];

  constructor(private userService: api.UsersService, private modalCtrl : ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      console.log(this.users);
    });
  }

  async openEditModal(user) {
    const modal = await this.modalCtrl.create({
      component: EditModalTeamsComponent,
      componentProps: user
    });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalTeamsComponent
    });

    return await modal.present();
  }

  async delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({

        header: 'Alert',
        subHeader: 'Delete team?',
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

}
