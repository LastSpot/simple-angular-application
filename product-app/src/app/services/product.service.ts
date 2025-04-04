import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product';

/**
 * ProductService
 * 
 * Service responsible for fetching product data from the mock API (JSON file).
 * Provides methods to retrieve all products or a single product by ID.
 * Implements error handling for HTTP requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /** URL to the mock products data JSON file */
  private productsUrl = 'assets/mock-data/products.json';

  /**
   * Constructor
   * @param http Angular's HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all products
   * @returns Observable of Product array
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  /**
   * Get a specific product by ID
   * @param id The ID of the product to retrieve
   * @returns Observable of a single Product or undefined if not found
   */
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

  /**
   * Error handler for HTTP operations
   * @param operation - Name of the operation that failed
   * @param result - Optional value to return as the observable result
   * @returns Function that handles the error and returns a safe value
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
