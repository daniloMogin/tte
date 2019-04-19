import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UsersService } from '../../../services';

@Component({
  selector: 'app-edit-modal-teams',
  templateUrl: './edit-modal-teams.component.html',
  styleUrls: ['./edit-modal-teams.component.scss'],
})
export class EditModalTeamsComponent implements OnInit {

  user: any;

  constructor(public modalCtrl: ModalController, private navParams: NavParams, private userService: UsersService) { }

  ngOnInit() {
    this.user = this.navParams.data;
    console.log(this.user);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveData() {
    this.userService.updateUser(this.user._id, this.user).subscribe(response => { console.log(response); });
  }

}
