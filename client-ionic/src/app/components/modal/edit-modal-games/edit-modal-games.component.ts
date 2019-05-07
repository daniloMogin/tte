import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GamesService } from '../../../services/games.service';

@Component({
  selector: 'app-edit-modal-games',
  templateUrl: './edit-modal-games.component.html',
  styleUrls: ['./edit-modal-games.component.scss'],
})
export class EditModalGamesComponent implements OnInit {

  game: any = {}

  constructor(public modalCtrl: ModalController, private navParams: NavParams, private gameService: GamesService) { }

  ngOnInit() {
    this.game = this.navParams.data;
    console.log(this.navParams.data);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  saveData() {
    console.log(this.game);
    this.gameService.updateGame(this.game._id, this.game).subscribe(response => {
      console.log('Response recieved');
      console.log(response);
      if (response.success) {
        this.modalCtrl.dismiss(this.game);
      }
   });
 }

}
