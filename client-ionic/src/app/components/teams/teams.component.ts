import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as api from '../../services';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
users = [];

  constructor(private userService: api.UsersService, private modalCtrl : ModalController) { }

  ngOnInit() {this.userService.getUsers().subscribe(response => {
    this.users = response;
    console.log(this.users);

  })
}
  async openModal() {
  const modal = await this.modalCtrl.create({
    component: EditModalTeamsComponent
    
  });

  return await modal.present();
}
}
