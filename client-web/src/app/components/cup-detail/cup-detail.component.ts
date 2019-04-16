import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupsService } from '../../services';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.css']
})
export class CupDetailComponent implements OnInit {

  private cup: object = {};

  constructor(private route: ActivatedRoute, private cupsService: CupsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cupsService.getCupById(id).subscribe(response => {
      this.cup = response.cup;
      console.log(this.cup);
    });
  }

}
