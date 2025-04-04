import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

/**
 * ProductListComponent
 * 
 * Displays a list of products in a responsive grid layout.
 * Includes a hero section with search functionality and filter options.
 * Main landing page for the application.
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  /** Array of products to display in the list */
  products: Product[] = [];

  /**
   * Constructor
   * @param productService - Service to fetch product data
   * @param router - Angular Router for navigation
   */
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that runs on component initialization
   * Fetches products from the ProductService
   */
  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Fetches all products from the service
   * Subscribes to the Observable and updates the products array
   */
  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  /**
   * Handles product selection event from the ProductCardComponent
   * Navigates to the product detail page with the selected product's ID
   * @param product - The selected product
   */
  onProductSelected(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }
}
