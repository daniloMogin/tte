import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-edit-modal-groups',
  templateUrl: './edit-modal-groups.component.html',
  styleUrls: ['./edit-modal-groups.component.scss'],
})
export class EditModalGroupsComponent implements OnInit {
  group: any;

  constructor(public modalCtrl: ModalController, private navParams: NavParams, private groupService: GroupsService) { }

  ngOnInit() {
    this.group = this.navParams.data;
    console.log(this.group);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  saveData() {
    this.groupService.updateGroup(this.group._id, this.group).subscribe(response => { console.log(response); });
  }
}