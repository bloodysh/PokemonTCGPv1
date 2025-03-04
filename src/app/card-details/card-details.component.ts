import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  cardId!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cardId = Number(this.route.snapshot.paramMap.get('id'));
  }
}