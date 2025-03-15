import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';
  private cacheTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor(private http: HttpClient) { }

  // Add this new method
  getCardsByType(type: string): Observable<any> {
    // Check cache first
    const cachedData = this.getFromCache(`pokemon_cards_${type}`);
    if (cachedData) {
      return of(cachedData);
    }

    // If not in cache, get from API and store in cache
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKey}`
    });

    // Use the API's query parameter to filter by type
    return this.http.get<any>(`${this.apiUrl}?q=types:${type}`, { headers }).pipe(
      tap(data => this.saveToCache(`pokemon_cards_${type}`, data))
    );
  }

 // Get details for a specific card by ID
getCardDetails(cardId: string): Observable<any> {
  // Check cache first
  const cachedData = this.getFromCache(`card_details_${cardId}`);
  if (cachedData) {
    return of(cachedData);
  }

  // If not in cache, get from API and store in cache
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.apiKey}`
  });

  return this.http.get<any>(`${this.apiUrl}/${cardId}`, { headers }).pipe(
    tap(data => this.saveToCache(`card_details_${cardId}`, data)),
    catchError(error => {
      console.error('Error fetching card details:', error);
      return throwError(error);
    })
  );
}

// Get all Pokemon cards (with optional pagination)
getPokemonCards(pageSize: number = 20, page: number = 1): Observable<any> {
  // Check cache first
  const cacheKey = `all_pokemon_cards_${pageSize}_${page}`;
  const cachedData = this.getFromCache(cacheKey);
  if (cachedData) {
    return of(cachedData);
  }

  // If not in cache, get from API and store in cache
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.apiKey}`
  });

  return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`, { headers }).pipe(
    tap(data => this.saveToCache(cacheKey, data)),
    catchError(error => {
      console.error('Error fetching Pokemon cards:', error);
      return throwError(error);
    })
  );
}
  
  // Helper methods for caching
  private saveToCache(key: string, data: any): void {
    const cacheEntry = {
      timestamp: new Date().getTime(),
      data: data
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  }

  private getFromCache(key: string): any | null {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) {
      return null;
    }

    const cacheEntry = JSON.parse(cachedItem);
    const now = new Date().getTime();
    
    // Check if the cache is still valid
    if (now - cacheEntry.timestamp > this.cacheTime) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheEntry.data;
  }
}
