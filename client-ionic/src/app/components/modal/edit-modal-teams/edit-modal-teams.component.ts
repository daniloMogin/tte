import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal-teams',
  templateUrl: './edit-modal-teams.component.html',
  styleUrls: ['./edit-modal-teams.component.scss'],
})
export class EditModalTeamsComponent implements OnInit {

  constructor(public modalCtrl: ModalController ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
