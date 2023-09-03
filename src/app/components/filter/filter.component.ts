import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterComponent),
  multi: true,
};
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterComponent),
      multi: true,
    },
  ],
})
export class FilterComponent {
  @Input() filterText: string = '';
  @Input() placeholder: string = '';
  @Output() filterTextChange = new EventEmitter<string>();

  writeValue(value: any): void {
    this.filterText = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFilterTextChange(): void {
    this.onChange(this.filterText);
    this.filterTextChange.emit(this.filterText);
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};
}
