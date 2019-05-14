import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-extended-select',
  templateUrl: './extended-select.component.html',
  styleUrls: ['./extended-select.component.scss'],
})
export class ExtendedSelectComponent implements OnInit {

  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();

  @Input() items: any[];
  @Input() valueField: string;
  @Input() textField: string;
  @Input() multiple: boolean;
  @Input() placeholder: string;
  @Input() title: string;

  private model2: any = '';
  private items2: any[] = [];

  @ViewChild('selectableComponent') selectableComponent: IonicSelectableComponent;

  constructor() { }

  ngOnInit() {
    console.log(this.model);
    console.log(this.items);
    console.log(this.valueField);
    console.log(this.textField);
    
    
    
  }

  formatSelectedValues(values) {
    return values.map(value => value.name).join(', ');
  }

  confirmSelect() {
    this.selectableComponent.confirm();
    this.selectableComponent.close();
  }

  valueChange(event) {
    this.modelChange.emit(event.value);
  }

}
