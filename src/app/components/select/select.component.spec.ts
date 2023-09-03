import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
    });
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle options when toggleOptions is called', () => {
    expect(component.showOptions).toBeFalse();
    component.toggleOptions();
    expect(component.showOptions).toBeTrue();
    component.toggleOptions();
    expect(component.showOptions).toBeFalse();
  });

  it('should emit selectedOptionChange event when optionSelected is called', () => {
    const selectedOption = 'asc';
    spyOn(component.selectedOptionChange, 'emit');
    component.selectedOption = selectedOption;
    component.optionSelected();
    expect(component.selectedOptionChange.emit).toHaveBeenCalledWith(
      selectedOption
    );
  });

  it('should hide options when optionSelected is called', () => {
    component.showOptions = true;
    component.optionSelected();
    expect(component.showOptions).toBeFalse();
  });
});
