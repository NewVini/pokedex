import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() types: string[] = [];
  @Output() typeSelected = new EventEmitter<string>();

  selectType(type: string): void {
    this.typeSelected.emit(type);
  }
}
