import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  private group: any = {};
  private loaded = false;
  showBar: boolean = true;

  constructor(private groupsService: api.GroupsService, private route: ActivatedRoute) { }

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
    });
  }

}
