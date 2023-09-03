import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>();

  showOptions: boolean = false;

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  optionSelected(): void {
    this.selectedOptionChange.emit(this.selectedOption);
    this.showOptions = false;
  }
}
