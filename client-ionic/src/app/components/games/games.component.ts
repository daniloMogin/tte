import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services';
import { EditModalTeamsComponent } from '../modal/edit-modal-teams/edit-modal-teams.component';
import { ModalController, AlertController } from '@ionic/angular';
import { EditModalGamesComponent } from '../modal/edit-modal-games/edit-modal-games.component';
import { AddModalGamesComponent } from '../modal/add-modal-games/add-modal-games.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  searchTerm: string = '';
  games: any[] = [];
  showBar: boolean = true;
  loaded: boolean = false;
  filteredData: any[] = [];

  constructor(private gamesService: GamesService, private modalCtrl: ModalController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.gamesService.getGames().subscribe(response => {
      this.games = response.game;
      this.games.forEach(game => {
        game.scoreString = game.score[0].teamPoints + ' - ' + game.score[1].teamPoints;
      });
      this.showBar = false;
      this.loaded = true;
      console.log(this.games)
      this.filteredData = this.games;
    });
  }

  setFilteredLocation() {
    this.filteredData = this.games.filter((game) => {
      return game.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  async openEditModal(game) {
    const modal = await this.modalCtrl.create({
      component: EditModalGamesComponent,
      componentProps: game,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.games[this.games.indexOf(game)] = data.data;
          this.setFilteredLocation();
        }
    });

    return await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalGamesComponent,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          const newGame = data.data;
          newGame.scoreString = '0 - 0';
          this.games.push(newGame);
          this.filteredData.push(newGame);
        }
    });

    return await modal.present();
  }

  async delete(event: Event, game) {
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
            this.gamesService.deleteGame(game._id).subscribe(response => {
              console.log(response);
              if (response.success) {
                this.games = this.games.filter(elem => elem !== game);
              }
            });
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
