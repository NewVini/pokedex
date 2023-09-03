import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list.component';
import { ChangeDetectorRef } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PokemonService } from '../../services/pokemon.service';
import { of } from 'rxjs';
import { FilterComponent } from '../../components/filter/filter.component';
import { SelectComponent } from '../../components/select/select.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SwitchComponent } from '../../components/switch/switch.component';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockChangeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(() => {
    mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', [
      'detectChanges',
    ]);
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', [
      'isFavorite',
    ]);
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemons',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        PokemonListComponent,
        PokemonCardComponent,
        FilterComponent,
        SelectComponent,
        ButtonComponent,
        SwitchComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    });

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter pokemons by text', () => {
    component.filterText = 'Char';
    component.pokemons = [
      { national_number: 1, name: 'Charmander' },
      { national_number: 2, name: 'Pikachu' },
      { national_number: 3, name: 'Charizard' },
    ];
    const filteredPokemons = component.filterPokemons();
    expect(filteredPokemons.length).toEqual(2);
    expect(filteredPokemons[0].national_number).toEqual(1);
    expect(filteredPokemons[1].national_number).toEqual(3);
  });

  it('should toggle showFavoritesOnly', () => {
    component.toggleShowFavoritesOnly();
    expect(component.showFavoritesOnly).toEqual(true);
    component.toggleShowFavoritesOnly();
    expect(component.showFavoritesOnly).toEqual(false);
  });

  it('should filter pokemons by type when showFavoritesOnly is true', () => {
    component.showFavoritesOnly = true;
    component.selectedType = 'Water';
    mockFavoritesService.isFavorite.and.returnValue(true);
    component.pokemons = [
      { national_number: 1, type: ['Water'], name: 'Squirtle' },
      { national_number: 2, type: ['Fire'], name: 'Charmander' },
    ];
    const filteredPokemons = component.filterPokemons();
    expect(filteredPokemons.length).toEqual(1);
    expect(filteredPokemons[0].national_number).toEqual(1);
  });

  it('should filter pokemons by type when showFavoritesOnly is false', () => {
    component.showFavoritesOnly = false;
    component.selectedType = 'Water';
    component.pokemons = [
      { national_number: 1, type: ['Water'], name: 'Squirtle' },
      { national_number: 2, type: ['Fire'], name: 'Charmander' },
    ];
    const filteredPokemons = component.filterPokemons();
    expect(filteredPokemons.length).toEqual(1);
    expect(filteredPokemons[0].national_number).toEqual(1);
  });

  it('should sort pokemons in ascending order', () => {
    component.selectedSortOption = 'asc';
    component.pokemons = [{ national_number: 2 }, { national_number: 1 }];
    component.sortPokemons();
    expect(component.pokemons[0].national_number).toEqual(1);
    expect(component.pokemons[1].national_number).toEqual(2);
  });

  it('should sort pokemons in descending order', () => {
    component.selectedSortOption = 'desc';
    component.pokemons = [{ national_number: 2 }, { national_number: 1 }];
    component.sortPokemons();
    expect(component.pokemons[0].national_number).toEqual(2);
    expect(component.pokemons[1].national_number).toEqual(1);
  });

  it('should filter pokemons by type', () => {
    component.selectedType = 'Fire';
    component.pokemons = [
      { national_number: 1, type: ['Fire'] },
      { national_number: 2, type: ['Water'] },
      { national_number: 3, type: ['Fire'] },
    ];
    const filteredPokemons = component.filterPokemons();
    expect(filteredPokemons.length).toEqual(2);
    expect(filteredPokemons[0].national_number).toEqual(1);
    expect(filteredPokemons[1].national_number).toEqual(3);
  });

  it('should update filterText and call filterPokemons', () => {
    spyOn(component, 'filterPokemons');
    component.updateFilterText('Char');
    expect(component.filterText).toEqual('Char');
    expect(component.filterPokemons).toHaveBeenCalled();
  });
});
