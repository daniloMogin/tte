import { Component, OnInit } from '@angular/core';
import * as api from '../../services';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
users = [];
  constructor(private userService: api.UsersService) { }

  ngOnInit() {this.userService.getUsers().subscribe(response => {
    this.users = response;
    console.log(this.users);

  })
}

}
