import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

/**
 * ProductCardComponent
 * 
 * Displays a single product in a card format with image, name, price, and description.
 * Includes badge indicators for product price category and action buttons.
 * Used by ProductListComponent to display multiple products in a grid.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  /** The product object to be displayed in this card */
  @Input() product!: Product;
  
  /** Event emitter that fires when a product is selected/clicked */
  @Output() productSelected = new EventEmitter<Product>();

  /**
   * Handles the selection of a product
   * Emits the product object to the parent component
   */
  onSelect(): void {
    this.productSelected.emit(this.product);
  }
  
  /**
   * Determines the CSS class for the product badge based on price
   * @returns CSS class name for the badge ('budget', 'premium', or 'standard')
   */
  getBadgeClass(): string {
    if (this.product.price < 300) {
      return 'budget';
    } else if (this.product.price > 1000) {
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
    if (this.product.price < 300) {
      return 'BUDGET';
    } else if (this.product.price > 1000) {
      return 'PREMIUM';
    } else {
      return 'POPULAR';
    }
  }
}
