import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { EditModalGroupsComponent } from '../modal/edit-modal-groups/edit-modal-groups.component';
import { ModalController } from '@ionic/angular';
import { AddModalGroupsComponent } from '../modal/add-modal-groups/add-modal-groups.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: [];
  constructor(private groupsService: api.GroupsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.groupsService.getGroup().subscribe(response => {
      this.groups = response.group;
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

}
