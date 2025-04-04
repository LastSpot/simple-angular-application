import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

/**
 * Unit tests for ProductDetailComponent
 * 
 * Tests functionality including:
 * - Component creation
 * - Route parameter handling
 * - Service integration for product retrieval
 * - Navigation
 * - Display of product details
 * - Badge class and text methods
 */
describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;
  
  // Mock product data for testing
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 599.99,
    description: 'This is a test product description'
  };

  /**
   * Test setup - runs before each test
   * Configures the testing module with the component and mocked dependencies
   */
  beforeEach(async () => {
    // Create mock services and route
    mockProductService = jasmine.createSpyObj('ProductService', ['getProduct']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      }
    };
    
    // Configure mock service behavior
    mockProductService.getProduct.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
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
   * Tests that getProduct is called with the correct ID on initialization
   */
  it('should call getProduct with the ID from route params on initialization', () => {
    expect(mockProductService.getProduct).toHaveBeenCalledWith(1);
  });
  
  /**
   * Tests that product data is loaded from the service
   */
  it('should load the product data from the service', () => {
    expect(component.product).toEqual(mockProduct);
  });
  
  /**
   * Tests that navigation occurs when goBack is called
   */
  it('should navigate to products list when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });
  
  /**
   * Tests navigation to products list when product is not found
   */
  it('should navigate to products list when product is not found', () => {
    // Set up the service to return undefined (product not found)
    mockProductService.getProduct.and.returnValue(of(undefined));
    
    // Re-initialize the component
    component.ngOnInit();
    
    // Verify navigation occurred
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });
  
  /**
   * Tests the getBadgeClass method for standard price
   */
  it('should return correct badge class based on price', () => {
    // Test with standard price
    component.product = mockProduct; // Price is 599.99
    expect(component.getBadgeClass()).toBe('standard');
    
    // Test with no product (should return standard)
    component.product = undefined;
    expect(component.getBadgeClass()).toBe('standard');
  });
  
  /**
   * Tests the getBadgeText method for standard price
   */
  it('should return correct badge text based on price', () => {
    // Test with standard price
    component.product = mockProduct; // Price is 599.99
    expect(component.getBadgeText()).toBe('POPULAR');
    
    // Test with no product (should return POPULAR)
    component.product = undefined;
    expect(component.getBadgeText()).toBe('POPULAR');
  });
  
  /**
   * Tests that product details are displayed correctly in the template
   */
  it('should display product details in the template', () => {
    // Make sure the template is updated with the component data
    fixture.detectChanges();
    
    // Find elements in the template
    const productName = fixture.debugElement.query(By.css('h1')).nativeElement;
    const productPrice = fixture.debugElement.query(By.css('.price')).nativeElement;
    
    // Verify content matches the mock product
    expect(productName.textContent).toContain(mockProduct.name);
    expect(productPrice.textContent).toContain(mockProduct.price.toFixed(2));
  });
});
