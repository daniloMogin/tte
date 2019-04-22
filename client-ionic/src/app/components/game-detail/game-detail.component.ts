import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  private game: any[] = [];

  constructor(private route: ActivatedRoute, private gamesService: GamesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gamesService.getGameById(id).subscribe(response => {
      this.game = response.game;
      console.log(this.game);
    });
  }

}
