import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from '../../../services';

@Component({
  selector: 'app-add-modal-teams',
  templateUrl: './add-modal-teams.component.html',
  styleUrls: ['./add-modal-teams.component.scss'],
})
export class AddModalTeamsComponent implements OnInit {

  team: any;

  constructor(public modalCtrl: ModalController, private userService: UsersService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addCup() {
    console.log("Adding cup");
    return;
    this.userService.createUsers(this.team).subscribe(response => console.log(response));
  }

}
