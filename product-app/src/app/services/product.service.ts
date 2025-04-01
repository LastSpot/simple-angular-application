import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/mock-data/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProduct', [])),
        // Map the array to find the product with the matching id
        // Note: in a real app, you would have an API endpoint to get a single product
        // rather than filtering client-side
        map((products: Product[]) => products.find(product => product.id === id))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
