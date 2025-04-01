import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

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

  goBack(): void {
    this.router.navigate(['/products']);
  }
  
  getBadgeClass(): string {
    if (this.product && this.product.price < 300) {
      return 'budget';
    } else if (this.product && this.product.price > 1000) {
      return 'premium';
    } else {
      return 'standard';
    }
  }
  
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
