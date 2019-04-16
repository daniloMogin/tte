import { Component, OnInit } from '@angular/core';
import * as apiServices from '../../services';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.css']
})
export class CupsComponent implements OnInit {

  constructor(private cupsService: apiServices.CupsService) { }

  ngOnInit() {
  }

}
