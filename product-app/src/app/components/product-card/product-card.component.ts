import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productSelected = new EventEmitter<Product>();

  onSelect(): void {
    this.productSelected.emit(this.product);
  }
  
  getBadgeClass(): string {
    if (this.product.price < 300) {
      return 'budget';
    } else if (this.product.price > 1000) {
      return 'premium';
    } else {
      return 'standard';
    }
  }
  
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
