import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the ButtonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set the types input correctly', () => {
    const types = ['Grass', 'Fire', 'Water'];
    component.types = types;
    expect(component.types).toEqual(types);
  });
  it('should emit typeSelected with the selected type', () => {
    const type = 'Grass';
    spyOn(component.typeSelected, 'emit');

    component.selectType(type);

    expect(component.typeSelected.emit).toHaveBeenCalledWith(type);
  });
});
