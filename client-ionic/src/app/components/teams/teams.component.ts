import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as api from '../../services';
import { EditModalComponent } from '../modal/edit-modal/edit-modal.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
users = [];
modal = null;
  constructor(private userService: api.UsersService, private modalCtrl : ModalController) { }

  ngOnInit() {this.userService.getUsers().subscribe(response => {
    this.users = response;
    console.log(this.users);

  })
}
  async openModal() {
  this.modal = await this.modalCtrl.create({
    component: EditModalComponent
    
  });

  this.modal.present();
}
}
