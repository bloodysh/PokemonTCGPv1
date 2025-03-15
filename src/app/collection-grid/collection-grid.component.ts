import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-collection-grid',
  templateUrl: './collection-grid.component.html',
  styleUrls: ['./collection-grid.component.css'],
    standalone: false
})
export class CollectionGridComponent implements OnInit {
  images: { id: string, url: string }[] = [];
  loading = true;
  error = '';
  currentType: string = 'Grass'; // Default to Grass type
  
  // Define available Pokemon types
  pokemonTypes: string[] = [
    'Grass', 'Fire', 'Water', 'Lightning', 'Psychic', 
    'Fighting', 'Darkness', 'Metal', 'Fairy', 'Dragon', 'Colorless'
  ];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.fetchCardsByType(this.currentType);
  }

  fetchCardsByType(type: string): void {
    this.loading = true;
    this.error = '';
    this.currentType = type;
    
    this.pokemonService.getCardsByType(type).subscribe(
      data => {
        this.images = data.data.slice(0, 16).map((card: any) => ({
          id: card.id,
          url: card.images.small
        }));
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching ${type} Pokemon cards`, error);
        this.error = `Failed to load ${type} cards. Please try again later.`;
        this.loading = false;
      }
    );
  }
  
  fetchPokemonCards(): void {
    this.loading = true;
    this.error = '';
    
    this.pokemonService.getPokemonCards().subscribe(
      data => {
        this.images = data.data.slice(0, 16).map((card: any) => ({
          id: card.id,
          url: card.images.small
        }));
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Pokemon cards', error);
        this.error = 'Failed to load cards. Please try again later.';
        this.loading = false;
      }
    );
  }
  
  refreshCards(): void {
    if (this.currentType) {
      // Clear type-specific cache
      localStorage.removeItem(`pokemon_cards_${this.currentType}`);
      this.fetchCardsByType(this.currentType);
    } else {
      // Clear general cache
      localStorage.removeItem('pokemon_cards');
      this.fetchPokemonCards();
    }
  }
}