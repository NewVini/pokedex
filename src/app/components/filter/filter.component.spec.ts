import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set the filterText input correctly', () => {
    const filterText = 'Test Filter Text';
    component.filterText = filterText;
    expect(component.filterText).toEqual(filterText);
  });
  it('should set the placeholder input correctly', () => {
    const placeholder = 'Test Placeholder';
    component.placeholder = placeholder;
    expect(component.placeholder).toEqual(placeholder);
  });
  it('should emit filterTextChange with the correct value', () => {
    const filterText = 'Test Filter Text';
    spyOn(component.filterTextChange, 'emit');

    component.filterText = filterText;

    component.onFilterTextChange();

    expect(component.filterTextChange.emit).toHaveBeenCalledWith(filterText);
  });
});
