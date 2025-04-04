import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

/**
 * Unit tests for ProductListComponent
 * 
 * Tests functionality including:
 * - Component creation
 * - Service integration for product retrieval
 * - Event handling and navigation
 * - Component rendering
 */
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;
  
  // Mock product data for testing
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Test Product 1',
      price: 199.99,
      description: 'Budget test product'
    },
    {
      id: 2,
      name: 'Test Product 2',
      price: 599.99,
      description: 'Standard test product'
    },
    {
      id: 3,
      name: 'Test Product 3',
      price: 1299.99,
      description: 'Premium test product'
    }
  ];

  /**
   * Test setup - runs before each test
   * Configures the testing module with the component and mocked dependencies
   */
  beforeEach(async () => {
    // Create mock services
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    // Configure mock service behavior
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, ProductCardComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Basic test to verify component creation
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  /**
   * Tests that getProducts is called on initialization
   */
  it('should call getProducts on initialization', () => {
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });
  
  /**
   * Tests that products are populated from the service
   */
  it('should populate products from the service', () => {
    expect(component.products).toEqual(mockProducts);
  });
  
  /**
   * Tests navigation to product detail when a product is selected
   */
  it('should navigate to product detail when product is selected', () => {
    // Call the method directly to test navigation
    const selectedProduct = mockProducts[0];
    component.onProductSelected(selectedProduct);
    
    // Verify navigation occurred with the correct parameters
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products', selectedProduct.id]);
  });
  
  /**
   * Tests that the correct number of product cards are rendered
   */
  it('should render the correct number of product cards', () => {
    // The test needs to make sure the component's template is fully rendered
    fixture.detectChanges();
    
    // Query all product cards
    const productCards = fixture.debugElement.queryAll(By.css('.product-item'));
    
    // Verify the number of rendered cards matches the mock data
    expect(productCards.length).toBe(mockProducts.length);
  });
});
