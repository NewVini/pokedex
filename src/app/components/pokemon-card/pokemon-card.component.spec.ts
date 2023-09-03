import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { FavoritesService } from '../../services/favorites.service';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(() => {
    favoritesService = jasmine.createSpyObj('FavoritesService', [
      'isFavorite',
      'addToFavorites',
      'removeFromFavorites',
    ]);

    TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      providers: [{ provide: FavoritesService, useValue: favoritesService }],
    });

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToFavorites when toggleFavorite is called with a non-favorite Pokémon', () => {
    const pokemonName = 'Pikachu';
    favoritesService.isFavorite.and.returnValue(false);

    component.toggleFavorite(pokemonName);

    expect(favoritesService.addToFavorites).toHaveBeenCalledWith(pokemonName);
  });

  it('should call removeFromFavorites when toggleFavorite is called with a favorite Pokémon', () => {
    const pokemonName = 'Charizard';
    favoritesService.isFavorite.and.returnValue(true);

    component.toggleFavorite(pokemonName);

    expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith(
      pokemonName
    );
  });

  it('should toggle favorite status when toggleFavorite is called', () => {
    const pokemonName = 'Bulbasaur';
    favoritesService.isFavorite.and.returnValue(false);

    component.toggleFavorite(pokemonName);

    expect(favoritesService.addToFavorites).toHaveBeenCalledWith(pokemonName);

    favoritesService.isFavorite.and.returnValue(true);

    component.toggleFavorite(pokemonName);

    expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith(
      pokemonName
    );
  });
});
