import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services';
import { EditModalGamesComponent } from '../modal/edit-modal-games/edit-modal-games.component';
import { ModalController } from '@ionic/angular';

import * as _ from 'lodash';

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

  constructor(private groupsService: api.GroupsService, private teamsService: UsersService, private route: ActivatedRoute, private modalCtrl: ModalController) { }

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

      console.log(this.group.teams);
      this.loaded = true;

      console.log(this.group.score);
      let i = 0;
      this.group.teams.forEach(team => {
        team.position = ++i;
        team.fullName = team.name + ' ' + team.lastname;
        this.addTeamsSelect.push(team._id);
      });

      this.group.score.forEach(game => {
        game.sortTeam1 = game.score[0].teamName;
        game.sortTeam2 = game.score[1].teamName;
        game.scoreString = game.score[0].teamPoints + ' - ' + game.score[1].teamPoints;
      })
    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      this.teams.forEach(team => {
        team.fullName = team.name + ' ' + team.lastname;
      })
      console.log(this.teams);
    });

  }

  changeTeams(group) {

    console.log(`changeTeams... `);
    const newTeams = [];
    let i = 0;
    this.addTeamsSelect.forEach(id => {
      const newTeam = this.teams.find(team => {
        return team._id === id;
      })
      newTeam.position = ++i;
      newTeams.push(newTeam);
    });
    group.teams = newTeams;
    this.groupsService.updateGroup(group._id, group).subscribe(response => {
      // console.log(`response`);
      // console.log(response);
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

  async openModal(game) {
    const modal = await this.modalCtrl.create({
      component: EditModalGamesComponent,
      componentProps: _.cloneDeep(game),
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.group.score[this.group.score.indexOf(game)] = data.data;
        }
    });

    return await modal.present();
  }


}
