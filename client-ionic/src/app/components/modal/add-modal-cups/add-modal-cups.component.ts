import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { CupsService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-modal-cups',
  templateUrl: './add-modal-cups.component.html',
  styleUrls: ['./add-modal-cups.component.scss'],
})
export class AddModalCupsComponent implements OnInit {

  cup: any = {
    name: '',
    description: '',
    groups: [],
    active: true
  };

  constructor(public modalCtrl: ModalController, private cupsService: CupsService, private router: Router) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss(false);
  }

  addCup() {
    console.log("Adding cup");
    console.log(this.cup);
    this.cupsService.createCup(this.cup).subscribe(response => {
      if (response.success) {
        this.modalCtrl.dismiss(false);
        this.router.navigate(['/cups/'+response.cup._id]);
      }
    });
  }

}
