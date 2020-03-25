import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['../../../css/button.css']
})
export class ButtonComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClick = new EventEmitter<any>();
  @Input() label: string;
  @Input() url: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onButtonClick(event) {
    this.onClick.emit(event);
  }

}
