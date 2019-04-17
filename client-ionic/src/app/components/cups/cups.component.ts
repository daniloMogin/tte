import { Component, OnInit } from '@angular/core';
import * as api from '../../services';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.css']
})
export class CupsComponent implements OnInit {

  cups: any[];

  constructor(private cupsService: api.CupsService) { }

  ngOnInit() {

    this.cupsService.getCups().subscribe(response => this.cups = response.cup);

  }

}
