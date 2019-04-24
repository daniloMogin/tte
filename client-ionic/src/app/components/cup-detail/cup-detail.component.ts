import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupsService, UsersService } from '../../services';
import { ModalController } from '@ionic/angular';
import { AddModalGroupsComponent } from '../modal/add-modal-groups/add-modal-groups.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.css']
})
export class CupDetailComponent implements OnInit {

  private cup: any = {};
  private loaded = false;

  private teams: any[] = [];
  private addTeamsSelect: any[] = [];

  constructor(private route: ActivatedRoute, private cupsService: CupsService, private teamsService: UsersService, private modalCtrl: ModalController, ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    const id = this.route.snapshot.paramMap.get('id');
    this.cupsService.getCupById(id).subscribe(response => {
      this.cup = response.cup;
      this.cup.groups.forEach(group => {
        this.addTeamsSelect.push([]);
      });
      console.log(this.cup);
      this.loaded = true;
    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      console.log(this.teams);
    });
  }

  async openAddGroupModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalGroupsComponent
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          const group = data.data;
          this.cup.groups.push(group);
          this.cup.winner = '';
          this.cup.second = '';
          this.cup.third = '';
          this.cupsService.updateCup(this.cup._id, this.cup).subscribe(response => {
            console.log(response);
          });
        }
    });

    return await modal.present();
  }

  addTeams(group) {
    let teamsToAdd = [];
    if (this.addTeamsSelect) {
      this.addTeamsSelect.forEach(i => {
        group.teams.push(this.teams[i]);
      });
      //this.teams = 
      this.addTeamsSelect = null;
    }
  }

  changeTeams(group, groupIndex) {
    const newTeams = [];
    this.addTeamsSelect[groupIndex].forEach(i => {
      newTeams.push(this.teams[i]);
    });
    group.teams = newTeams;
  }

}
