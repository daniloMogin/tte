import { Component, OnInit } from '@angular/core';
import { GamesService, UsersService } from 'src/app/services';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal-games',
  templateUrl: './add-modal-games.component.html',
  styleUrls: ['./add-modal-games.component.scss'],
})
export class AddModalGamesComponent implements OnInit {

  name: string;
  description: string;
  team1: string;
  team2: string;

  teams: any[];

  constructor(public modalCtrl: ModalController, private gamesService: GamesService, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(response => {
      console.log(response);
      
      this.teams = response;
    });
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }

  addGame() {

    const game = {
      name: this.name,
      description: this.description,
      active: true,
      teams: [
        this.teams.find(team => team._id === this.team1),
        this.teams.find(team => team._id === this.team2)
      ]
    };

    this.gamesService.createGame(game).subscribe(response => {
      console.log(response);
      this.modalCtrl.dismiss(response.game);
    });
  }

  constructGameName() {
    console.log('check name');
    
    if (this.team1 && this.team2 && !this.name) {
      console.log('construct name');
      
      const team1Obj = this.teams.find(team => team._id === this.team1);
      const team2Obj = this.teams.find(team => team._id === this.team2);
      this.name = team1Obj.name + ' ' + team1Obj.lastname + ' VS ' + team2Obj.name + ' ' + team2Obj.lastname;
    }
  }

}
