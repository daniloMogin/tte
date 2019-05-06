import { Component, OnInit } from '@angular/core';
import { GamesService, UsersService } from 'src/app/services';

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

  constructor(private gamesService: GamesService, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(response => {
      this.teams = response;
    });
  }

}
