import { Component, OnInit } from '@angular/core';
import * as api from '../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  groups = []
  constructor(private groupsService: api.GroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroupById(id).subscribe( response => {
      this.groups = response.group;
      console.log(this.groups)
    })
  }

}
