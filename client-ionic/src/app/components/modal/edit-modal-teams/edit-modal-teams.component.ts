import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UsersService } from '../../../services';

@Component({
  selector: 'app-edit-modal-teams',
  templateUrl: './edit-modal-teams.component.html',
  styleUrls: ['./edit-modal-teams.component.scss'],
})
export class EditModalTeamsComponent implements OnInit {

  user: any = {
    active: true
  }

  constructor(public modalCtrl: ModalController, private navParams: NavParams, private userService: UsersService) { }

  ngOnInit() {
    this.user = this.navParams.data;
    console.log(this.user);
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }

  saveData() {
    console.log('Updating user');
    console.log(this.user);

    this.user.fullName = this.user.name + ' ' + this.user.lastname;

    this.userService.updateUser(this.user._id, this.user).subscribe(response => { 
     console.log('Response recieved');
     console.log(response);
     if (response.success) {
      this.modalCtrl.dismiss(this.user);
      /*this.router.navigate(['/groups/'+response.group._id]);*/
    }
    });
  }

}
