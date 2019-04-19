import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupsService } from 'src/app/services';

@Component({
  selector: 'app-add-modal-groups',
  templateUrl: './add-modal-groups.component.html',
  styleUrls: ['./add-modal-groups.component.scss'],
})
export class AddModalGroupsComponent implements OnInit {

  group: any;

  constructor(public modalCtrl: ModalController, private groupsService: GroupsService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addGroup() {
    console.log("Adding cup");
    return;
    this.groupsService.createGroup(this.group).subscribe(response => console.log(response));
  }

}
