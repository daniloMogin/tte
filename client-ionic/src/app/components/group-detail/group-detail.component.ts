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
  showBar: boolean = true;

  private teams: any[];
  private addTeamsSelect: any[] = [];

  constructor(private groupsService: api.GroupsService, private teamsService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroupById(id).subscribe( response => {
      this.group = response.group;
      this.showBar = false;

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

      console.log(this.group.teams);
      this.group.teams.forEach(team => {
        this.addTeamsSelect.push(team._id);
      });
    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      console.log(this.teams);
    });

  }

  changeTeams(group) {
      console.log(`changeTeams... `);
      const newTeams = [];
    this.addTeamsSelect.forEach(id => {
      const newTeam = this.teams.find(team => {
        return team._id === id;
      })
      newTeams.push(newTeam);
    });
    group.teams = newTeams;
    this.groupsService.updateGroup(group._id, group).subscribe(response => {
      console.log(`response`);
      console.log(response);
      group.score = response.group.score;
      if (response.success) {
      }
    });
  }

  addTeams(group) {
    if (this.addTeamsSelect) {
      this.addTeamsSelect.forEach(i => {
        group.teams.push(this.teams[i]);
      });
    }
    this.addTeamsSelect = null;

  }


}
