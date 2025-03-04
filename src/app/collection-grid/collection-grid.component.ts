import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../PokemonTCGPv1/src/app/services/pokemon.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-collection-grid',
  templateUrl: './collection-grid.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./collection-grid.component.css']
})
export class CollectionGridComponent implements OnInit {
  images: { id: string, url: string }[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.fetchPokemonCards();
  }

  fetchPokemonCards(): void {
    this.pokemonService.getCardsInTypeOrder().subscribe(
      data => {
        this.images = data.data.map((card: any) => ({
          id: card.id,
          url: card.images.small
        }));
      },
      error => {
        console.error('Error fetching Pokemon cards', error);
      }
    );
  }
}
