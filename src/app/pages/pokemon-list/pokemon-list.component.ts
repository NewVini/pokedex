import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  filterText: string = '';
  placeholder: string = 'Pesquisar por nome ou número';
  selectedType: string | null = null;
  types: string[] = [
    'Bug',
    'Dark',
    'Dragon',
    'Electric',
    'Fairy',
    'Fighter',
    'Fire',
    'Flying',
    'Ghost',
    'Grass',
    'Ground',
    'Ice',
    'Normal',
    'Poison',
    'Psychic',
    'Rock',
    'Steel',
    'Water',
  ];
  pokemons: any[] = [];
  showFavoritesOnly: boolean = false;
  selectedSortOption: string = 'asc';

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoritesService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  sortPokemons(): void {
    if (this.selectedSortOption === 'asc') {
      this.pokemons.sort((a, b) =>
        a.national_number > b.national_number ? 1 : -1
      );
    } else if (this.selectedSortOption === 'desc') {
      this.pokemons.sort((a, b) =>
        a.national_number < b.national_number ? 1 : -1
      );
    }
    this.cdRef.detectChanges();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
    });
  }
  filterByType(type: string): void {
    this.selectedType = type;
  }

  toggleShowFavoritesOnly(): void {
    this.showFavoritesOnly = !this.showFavoritesOnly;
  }

  updateFilterText(filterText: string): void {
    this.filterText = filterText;
    this.filterPokemons();
    this.cdRef.detectChanges();
  }

  filterPokemons(): any[] {
    if (this.showFavoritesOnly) {
      return this.pokemons.filter(
        (pokemon) =>
          this.favoriteService.isFavorite(pokemon.name) &&
          ((pokemon.name &&
            pokemon.name
              .toLowerCase()
              .includes(this.filterText.toLowerCase())) ||
            pokemon.national_number.toString().includes(this.filterText)) &&
          (!this.selectedType || pokemon.type.includes(this.selectedType))
      );
    } else {
      return this.pokemons.filter(
        (pokemon) =>
          ((pokemon.name &&
            pokemon.name
              .toLowerCase()
              .includes(this.filterText.toLowerCase())) ||
            pokemon.national_number.toString().includes(this.filterText)) &&
          (!this.selectedType || pokemon.type.includes(this.selectedType))
      );
    }
  }
}
