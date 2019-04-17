import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit() {

    this.gamesService.getGames().subscribe(response => this.games = response.game);

  }

}
