import { Component, OnInit } from '@angular/core';
import * as api from '../../services';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: [];
  constructor(private groupsService: api.GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroup().subscribe(response => {
      this.groups = response.group;
      console.log(this.groups);

    })
  }

}
