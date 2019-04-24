import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  users = [];
  showBar: boolean = true;
  constructor(private usersService: api.UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.getUserById(id).subscribe( response => {
      this.users = response.user;
      this.showBar = false;
      console.log(this.users)
    });
  }

}