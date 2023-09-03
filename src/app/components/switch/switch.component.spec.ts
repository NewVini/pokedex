import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchComponent],
    });
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with checked as false by default', () => {
    expect(component.checked).toBeFalse();
  });

  it('should toggle the switch when toggleSwitch is called', () => {
    component.checked = false;
    component.toggleSwitch();
    expect(component.checked).toBeTrue();
    component.toggleSwitch();
    expect(component.checked).toBeFalse();
  });

  it('should emit checkedChange event when toggleSwitch is called', () => {
    const checked = true;
    spyOn(component.checkedChange, 'emit');
    component.checked = checked;
    component.toggleSwitch();
    expect(component.checkedChange.emit).toHaveBeenCalledWith(!checked);
  });
});
