import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

/**
 * ProductDetailComponent
 * 
 * Displays detailed information about a selected product.
 * Shows product image, name, price, description, and actions.
 * Retrieves product data based on ID from the URL route.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  /** The product to display; undefined until data is loaded */
  product: Product | undefined;

  /**
   * Constructor
   * @param route - ActivatedRoute to access URL parameters
   * @param router - Router for navigation
   * @param productService - Service to fetch product data
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  /**
   * Lifecycle hook that runs on component initialization
   * Fetches the product based on the ID from the route
   */
  ngOnInit(): void {
    this.getProduct();
  }

  /**
   * Fetches the product data using the ID from the route
   * If product not found, redirects to product list
   */
  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        // If product not found, redirect to product list
        if (!product) {
          this.router.navigate(['/products']);
        }
      });
  }

  /**
   * Navigates back to the products list
   */
  goBack(): void {
    this.router.navigate(['/products']);
  }
  
  /**
   * Determines the CSS class for the product badge based on price
   * @returns CSS class name for the badge ('budget', 'premium', or 'standard')
   */
  getBadgeClass(): string {
    if (this.product && this.product.price < 300) {
      return 'budget';
    } else if (this.product && this.product.price > 1000) {
      return 'premium';
    } else {
      return 'standard';
    }
  }
  
  /**
   * Determines the text to display on the product badge based on price
   * @returns Display text for the badge ('BUDGET', 'PREMIUM', or 'POPULAR')
   */
  getBadgeText(): string {
    if (this.product && this.product.price < 300) {
      return 'BUDGET';
    } else if (this.product && this.product.price > 1000) {
      return 'PREMIUM';
    } else {
      return 'POPULAR';
    }
  }
}
