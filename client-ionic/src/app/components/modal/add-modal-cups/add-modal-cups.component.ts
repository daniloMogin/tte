import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { CupsService } from '../../../services';

@Component({
  selector: 'app-add-modal-cups',
  templateUrl: './add-modal-cups.component.html',
  styleUrls: ['./add-modal-cups.component.scss'],
})
export class AddModalCupsComponent implements OnInit {

  cup: any;

  constructor(public modalCtrl: ModalController, private cupsService: CupsService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addCup() {
    console.log("Adding cup");
    return;
    this.cupsService.createCup(this.cup).subscribe(response => console.log(response));
  }

}
