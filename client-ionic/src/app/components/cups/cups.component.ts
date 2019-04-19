import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as api from '../../services';
import { EditModalCupsComponent } from '../modal/edit-modal-cups/edit-modal-cups.component';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.css']
})
export class CupsComponent implements OnInit {

  cups: any[];

  constructor(private cupsService: api.CupsService,  private modalCtrl : ModalController) { }

  ngOnInit() {
    this.cupsService.getCups().subscribe(response => this.cups = response.cup);
  }

  async openModal(event: Event, cup) {

    event.stopPropagation();
    event.preventDefault();

    const modal = await this.modalCtrl.create({
      component: EditModalCupsComponent,
      componentProps: cup
    });

    return await modal.present();

  }

}
