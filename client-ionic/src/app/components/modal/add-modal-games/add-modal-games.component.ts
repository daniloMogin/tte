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
  teams1: any[];
  teams2: any[];

  working = false;

  constructor(public modalCtrl: ModalController, private gamesService: GamesService, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(response => {
      console.log(response);

      this.teams = response;
      this.teams.forEach(team => {
        team.fullName = team.name + ' ' + team.lastname;
      });
      this.teams1 = this.teams.slice();
      this.teams2 = this.teams.slice();
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

    this.working = true;

    this.gamesService.createGame(game).subscribe(response => {
      console.log(response);
      if (response && response.success) {
        this.working = false;
        this.modalCtrl.dismiss(response.game);
      }
    });
  }

  constructGameName() {
    if (this.team1 && this.team2 && !this.name) {
      const team1Obj = this.teams.find(team => team._id === this.team1);
      const team2Obj = this.teams.find(team => team._id === this.team2);
      this.name = team1Obj.name + ' ' + team1Obj.lastname + ' VS ' + team2Obj.name + ' ' + team2Obj.lastname;
    }
  }

  filterTeams(event, teams) {
    teams.length = 0;
    [].push.apply(teams, this.teams);
    teams.splice(teams.indexOf(event.value), 1);
  }

}
