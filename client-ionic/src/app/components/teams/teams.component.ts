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
  searchTerm: string = '';
  users = [];
  showBar: boolean = true;
  loaded: boolean = false;
  filteredData: any[] = [];

  constructor(private userService: api.UsersService, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.getUsers().subscribe(response => {
      this.showBar = false;
      this.loaded = true;
      this.users = response;
      this.users.forEach(user => {
        user.fullName = user.name + ' ' + user.lastname;
      });

      console.log(this.users);
      this.filteredData = this.users;
    });
  }

  setFilteredLocation() {
    this.filteredData = this.users.filter((user) => {
      return user.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  async openEditModal(user) {
    const modal = await this.modalCtrl.create({
      component: EditModalTeamsComponent,
      componentProps: user,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.users[this.users.indexOf(user)] = data.data;
          this.setFilteredLocation();
        }
      });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalTeamsComponent,
      cssClass: 'auto-height'
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
