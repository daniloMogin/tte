import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ModalController, AlertController } from '@ionic/angular';
import { EditModalGroupsComponent } from '../modal/edit-modal-groups/edit-modal-groups.component';
import { AddModalGroupsComponent } from '../modal/add-modal-groups/add-modal-groups.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: any[];
  showBar: boolean = true;

  constructor(private groupsService: api.GroupsService, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.groupsService.getGroup().subscribe(response => {
      console.log(response);
      
      this.groups = response.group;
      this.showBar = false;
      console.log(this.groups);
    });
  }

  async openEditModal(event: Event, group) {
    event.preventDefault();
    event.stopPropagation();

    const modal = await this.modalCtrl.create({
      component: EditModalGroupsComponent,
      componentProps: group
    });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalGroupsComponent
    });

    return await modal.present();
  }
  
  async delete(event: Event, group: any) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({

        header: 'Alert',
        subHeader: 'Delete group?',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            role: 'yes',
           handler: () => {
            this.groupsService.deleteGroup(group._id).subscribe(response => {
              console.log(response);
              if (response.success) {
                this.groups = this.groups.filter(elem => elem !== group );
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
