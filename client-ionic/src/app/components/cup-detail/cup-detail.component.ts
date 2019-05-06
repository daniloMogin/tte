import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupsService, UsersService, GroupsService } from '../../services';
import { ModalController, AlertController } from '@ionic/angular';
import { AddModalGroupsComponent } from '../modal/add-modal-groups/add-modal-groups.component';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.css']
})
export class CupDetailComponent implements OnInit {

  private cup: any = {};
  private loaded = false;
  showBar: boolean = true;

  private teams: any[] = [];
  private addTeamsSelect: any[] = [];

  constructor(
      private route: ActivatedRoute,
      private cupsService: CupsService,
      private teamsService: UsersService,
      private groupsService: GroupsService,
      private modalCtrl: ModalController,
      private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    const id = this.route.snapshot.paramMap.get('id');
    this.cupsService.getCupById(id).subscribe(response => {
      this.cup = response.cup;
      this.cup.groups.forEach(group => {
        const groupTeamsIds = [];
        group.teams.forEach(team => {
          groupTeamsIds.push(team._id);
        });
        this.addTeamsSelect.push(groupTeamsIds);
        console.log(this.addTeamsSelect);
        
      });
      console.log(this.cup);
      this.loaded = true;
    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      this.showBar = false;
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
      this.addTeamsSelect = null;
    }
  }

  changeTeams(group, groupIndex) {
    const newTeams = [];
    this.addTeamsSelect[groupIndex].forEach(id => {
      const newTeam = this.teams.find(team => {
        return team._id === id;
      });
      newTeams.push(newTeam);
    });
    group.teams = newTeams;
    this.groupsService.updateGroup(group._id, group).subscribe(response => {
      if (response.success) {
      }
    });
  }

  async removeGroup(groupToRemove) {
    const alert = await this.alertController.create({
      
      header: 'Alert',
      subHeader: 'Remove group from cup?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'yes',
          handler: () => {
            const filteredGroups = this.cup.groups.filter(group => group !== groupToRemove);
            const updatedCup = {...this.cup, groups: filteredGroups};
            console.log(updatedCup);
            this.cupsService.updateCup(this.cup._id, updatedCup).subscribe(response => {
              console.log(response);
              if (response.success) {
                this.cup = response.cup;
              }
            });
          }
        }, {
          text: 'No',
          role: 'no',
          handler: () => {
            console.log('No');
          }
        }
      ]
    
  });

  await alert.present();
  }

}
