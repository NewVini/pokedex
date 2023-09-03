import { Component, Input } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon: any;

  constructor(private favoritesService: FavoritesService) {}

  isFavorite(pokemonName: string): boolean {
    return this.favoritesService.isFavorite(pokemonName);
  }

  toggleFavorite(pokemonName: string): void {
    if (this.isFavorite(pokemonName)) {
      this.favoritesService.removeFromFavorites(pokemonName);
    } else {
      this.favoritesService.addToFavorites(pokemonName);
    }
  }
}
