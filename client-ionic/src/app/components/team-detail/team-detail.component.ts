import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute } from '@angular/router';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  user: any = [];
  showBar: boolean = true;
  constructor(private usersService: api.UsersService, private route: ActivatedRoute, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe( response => {
      this.user = response.user;
      this.showBar = false;
      console.log(this.user)
    });
  }

  async openTeamEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditModalTeamsComponent,
      componentProps: this.user,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.user = data.data;
        }
      });

    return await modal.present();
  }

}