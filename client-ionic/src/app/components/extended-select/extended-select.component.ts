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

  @Output() selected = new EventEmitter<any>();

  private currentValue: any;

  @ViewChild('selectableComponent') selectableComponent: IonicSelectableComponent;

  constructor() { }

  ngOnInit() {
    console.log(this.model);
    console.log(this.items);
    console.log(this.valueField);
    console.log(this.textField);
  }

  formatSelectedValues(values) {
    if (this.multiple) {
      return values.map(value => value.name).join(', ');
    } else {
      return values.fullName;
    }
  }

  confirmSelect() {
    this.selectableComponent.confirm();
    this.selectableComponent.close();
    this.selected.emit({value: this.currentValue});
  }

  valueChange(event) {
    this.modelChange.emit(event.value);
    this.currentValue = event.value;
  }

}
