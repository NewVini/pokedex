import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://unpkg.com/pokemons@1.1.0/pokemons.json';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
