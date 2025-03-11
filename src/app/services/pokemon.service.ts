import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) { }

  getCardDetails(cardId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKey}`
    });
    return this.http.get<any>(`${this.apiUrl}/${cardId}`, { headers });
  }

  getPokemonCards(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKey}`
    });
    return this.http.get<any>(`${this.apiUrl}?pageSize=20`, { headers });
  }

  getCardsInTypeOrder(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKey}`
    });
    return this.http.get<any>(`${this.apiUrl}?orderBy=type`, { headers });
  }
}