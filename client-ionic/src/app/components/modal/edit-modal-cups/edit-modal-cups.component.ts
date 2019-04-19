import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CupsService } from '../../../services';

@Component({
  selector: 'app-edit-modal-cups',
  templateUrl: './edit-modal-cups.component.html',
  styleUrls: ['./edit-modal-cups.component.scss'],
})
export class EditModalCupsComponent implements OnInit {

  cup: any;

  constructor(public modalCtrl: ModalController, private navParams: NavParams, private cupsService: CupsService) { }

  ngOnInit() {
    this.cup = this.navParams.data;
    console.log(this.cup);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveData() {
    console.log("UPDATING CUP");
    console.log(this.cup);
    this.cupsService.updateCup(this.cup._id, this.cup).subscribe(response => { console.log("RESPONSE RECEIVED");
      console.log(response); });
  }

}
