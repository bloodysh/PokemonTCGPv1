import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  cardId!: string;
  cardDetails: any;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.cardId = this.route.snapshot.paramMap.get('id')!;
    this.fetchCardDetails();
  }

  fetchCardDetails(): void {
    this.pokemonService.getCardDetails(this.cardId).subscribe(
      data => {
        this.cardDetails = data;
      },
      error => {
        console.error('Error fetching card details', error);
      }
    );
  }
}