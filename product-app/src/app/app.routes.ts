import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

/**
 * Application Routes Configuration
 * 
 * Defines the routing structure for the application:
 * - Empty path redirects to products list
 * - /products displays the product list page
 * - /products/:id displays the details for a specific product
 * - Any other route redirects to products list (404 handling)
 */
export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route redirects to products
  { path: 'products', component: ProductListComponent },    // Product list page
  { path: 'products/:id', component: ProductDetailComponent }, // Product detail page with dynamic id parameter
  { path: '**', redirectTo: '/products' }                  // Wildcard route for 404/not found
];
