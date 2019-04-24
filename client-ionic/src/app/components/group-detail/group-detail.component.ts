import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  private group: any = {};
  private loaded = false;

  private teams: any[];
  private addTeamsSelect: any;

  constructor(private groupsService: api.GroupsService, private teamsService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroupById(id).subscribe( response => {
      this.group = response.group;

      /* retrieving lost teams
      let teams = [];
      this.group.score.forEach(s => {
        if (!teams.includes(s.teams[0])) {
          teams.push(s.teams[0]);
        }
        if (!teams.includes(s.teams[1])) {
          teams.push(s.teams[1]);
        }
      })
      console.log(JSON.stringify(teams));
      console.log(teams);
      */

      console.log(this.group);
      this.loaded = true;
    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      console.log(this.teams);
    });

  }

  changeTeams(group) {
    const newTeams = [];
    if (this.addTeamsSelect) {
      this.addTeamsSelect.forEach(i => {
        newTeams.push(this.teams[i]);
      });
      group.teams = newTeams;
      //console.log(this.addTeamsSelect)
    }
  }

  addTeams(group) {
    console.log("ADDING TEAMS");
    
    if (this.addTeamsSelect) {
      this.addTeamsSelect.forEach(i => {
        group.teams.push(this.teams[i]);
      });
    }
    console.log(this.addTeamsSelect);
    
    this.addTeamsSelect = null;
    console.log(this.addTeamsSelect);
    
  }


}
