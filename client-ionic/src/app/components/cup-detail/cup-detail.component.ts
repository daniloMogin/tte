import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CupsService, UsersService, GroupsService } from '../../services';
import { ModalController, AlertController } from '@ionic/angular';
import { EditModalCupsComponent } from '../modal/edit-modal-cups/edit-modal-cups.component';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.css']
})
export class CupDetailComponent implements OnInit {

  cup: any = {};
  loaded = false;
  showBar: boolean = true;

  private teams: any[] = [];
  private addTeamsSelect: any[] = [];

  constructor(
      private route: ActivatedRoute,
      private cupsService: CupsService,
      private teamsService: UsersService,
      private groupsService: GroupsService,
      private modalCtrl: ModalController,
      private alertController: AlertController,
      private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    const id = this.route.snapshot.paramMap.get('id');
    this.cupsService.getCupById(id).subscribe(response => {
      this.cup = response.cup;
      this.processCup();
      console.log(this.cup);
      this.loaded = true;
    });

    this.teamsService.getUsers().subscribe(response => {
      this.teams = response;
      this.showBar = false;
      console.log(this.teams);
    });
  }

  processCup() {
    this.cup.groups.forEach(group => {
      const groupTeamsIds = [];
      let i = 0;
      group.teams.forEach(team => {
        team.position = ++i;
        team.fullName = team.name + ' ' + team.lastname;
        groupTeamsIds.push(team._id);
      });
      this.addTeamsSelect.push(groupTeamsIds);
      console.log(this.addTeamsSelect);

    });
  }

  async openCupEditModal() {

    const modal = await this.modalCtrl.create({
      component: EditModalCupsComponent,
      componentProps: this.cup,
      cssClass: 'auto-height'
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.cup = data.data;
          this.processCup();
        }
    });

    return await modal.present();

  }

  async deleteCup() {
    const alert = await this.alertController.create({
      
        header: 'Delete cup?',
        /*subHeader: 'Delete cup?',*/
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            role: 'yes',
            handler: () => {
              this.showBar = true;
              this.cupsService.deleteCup(this.cup._id).subscribe(response => {
                console.log(response);
                if (response.success) {
                  this.showBar = false;
                  this.router.navigate(['/cups']);
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

  changeTeams(group, groupIndex) {
    const newTeams = [];
    this.addTeamsSelect[groupIndex].forEach(id => {
      const newTeam = this.teams.find(team => {
        return team._id === id;
      });
      newTeams.push(newTeam);
    });
    let i = 0;
    newTeams.forEach(team => {
      team.position = ++i;
      team.fullName = team.name + ' ' + team.lastname;
    });
    group.teams = newTeams;
    this.showBar = true;
    this.groupsService.updateGroup(group._id, group).subscribe(response => {
      this.showBar = false;
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
            this.showBar = true;
            this.cupsService.updateCup(this.cup._id, updatedCup).subscribe(response => {
              console.log(response);
              this.showBar = false;
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
