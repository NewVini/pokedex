import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly storageKey = 'favoritePokemon';
  private favorites: string[] = [];

  constructor() {
    const storedFavorites = localStorage.getItem(this.storageKey);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  addToFavorites(pokemonName: string): void {
    if (!this.isFavorite(pokemonName)) {
      this.favorites.push(pokemonName);
      this.saveFavorites();
    }
  }

  removeFromFavorites(pokemonName: string): void {
    const index = this.favorites.indexOf(pokemonName);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  isFavorite(pokemonName: string): boolean {
    return this.favorites.includes(pokemonName);
  }

  getFavorites(): string[] {
    return this.favorites;
  }

  private saveFavorites(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }
}
