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
  searchTerm: string = '';
  groups: any[];
  showBar: boolean = true;
  loaded: boolean = false;
  filteredData: any[] = [];

  constructor(private groupsService: api.GroupsService, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.groupsService.getGroup().subscribe(response => {
      console.log(response);
      
      this.groups = response.group;
      this.showBar = false;
      this.loaded = true;
      this.filteredData = this. groups;
      console.log(this.groups);
    });
  }

  setFilteredLocation() {
    this.filteredData = this.groups.filter((group) => {
      return group.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  async openEditModal(event: Event, group) {
    event.preventDefault();
    event.stopPropagation();

    const modal = await this.modalCtrl.create({
      component: EditModalGroupsComponent,
      componentProps: group,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if (data.data) {
          console.log(group)
          console.log(data.data);
          
          this.groups[this.groups.indexOf(group)] = data.data;
        }
    });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalGroupsComponent,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          const group = data.data;
          this.groups.push(group);
        }
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
