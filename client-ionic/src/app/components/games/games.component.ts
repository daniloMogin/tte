import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';
import { ModalController, AlertController } from '@ionic/angular';
import { EditModalGamesComponent } from '../modal/edit-modal-games/edit-modal-games.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[] = [];

  constructor(private gamesService: GamesService, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {

    this.gamesService.getGames().subscribe(response => this.games = response.game);

  }
  async openModal(game) {
    const modal = await this.modalCtrl.create({
      component: EditModalGamesComponent,
      componentProps: game
    });

    return await modal.present();
  }
  async delete(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const alert = await this.alertController.create({

      header: 'Alert',
      subHeader: 'Delete game?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            console.log('Yes');
          }
        }, {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('No');
          }
        }
      ]

    });

    await alert.present();
  }
}
