import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GroupsService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-modal-groups',
  templateUrl: './add-modal-groups.component.html',
  styleUrls: ['./add-modal-groups.component.scss'],
})
export class AddModalGroupsComponent implements OnInit {

  group = {
    name: '',
    description: '',
    teams: '',
    active: true
  };

  constructor(public modalCtrl: ModalController, private groupsService: GroupsService, private router: Router) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addGroup() {
    console.log("Adding cup");
    this.groupsService.createGroup(this.group).subscribe(response => {
      if (response.success) {
        this.modalCtrl.dismiss(response.group);
        /*this.router.navigate(['/groups/'+response.group._id]);*/
      }
    });
  }

}
