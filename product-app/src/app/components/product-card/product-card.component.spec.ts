import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product';

/**
 * Unit tests for ProductCardComponent
 * 
 * Tests functionality including:
 * - Component creation
 * - Input property handling
 * - Output event emission
 * - Badge class and text methods
 */
describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  
  // Mock product data for testing
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 499.99,
    description: 'This is a test product description'
  };

  /**
   * Test setup - runs before each test
   * Configures the testing module with the component
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    
    // Set the mock product data for testing
    component.product = mockProduct;
    fixture.detectChanges();
  });

  /**
   * Basic test to verify component creation
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  /**
   * Tests that product data is correctly displayed in the template
   */
  it('should display product information correctly', () => {
    // Set up the test data
    component.product = mockProduct;
    fixture.detectChanges();
    
    // Query elements from the template
    const name = fixture.debugElement.query(By.css('h3')).nativeElement;
    const price = fixture.debugElement.query(By.css('.price')).nativeElement;
    const description = fixture.debugElement.query(By.css('.description')).nativeElement;
    
    // Verify content matches the mock product
    expect(name.textContent).toContain(mockProduct.name);
    expect(price.textContent).toContain(mockProduct.price.toFixed(2));
    expect(description.textContent).toContain(mockProduct.description);
  });
  
  /**
   * Tests that clicking the product emits the correct event
   */
  it('should emit productSelected event when button is clicked', () => {
    // Create spy to track event emissions
    spyOn(component.productSelected, 'emit');
    
    // Find and click the button
    const button = fixture.debugElement.query(By.css('.view-button')).nativeElement;
    button.click();
    
    // Verify the event was emitted with the correct product
    expect(component.productSelected.emit).toHaveBeenCalledWith(mockProduct);
  });
  
  /**
   * Tests the getBadgeClass method for different price ranges
   */
  it('should return the correct badge class based on price', () => {
    // Test budget price
    component.product = { ...mockProduct, price: 199.99 };
    expect(component.getBadgeClass()).toBe('budget');
    
    // Test standard price
    component.product = { ...mockProduct, price: 500 };
    expect(component.getBadgeClass()).toBe('standard');
    
    // Test premium price
    component.product = { ...mockProduct, price: 1500 };
    expect(component.getBadgeClass()).toBe('premium');
  });
  
  /**
   * Tests the getBadgeText method for different price ranges
   */
  it('should return the correct badge text based on price', () => {
    // Test budget price
    component.product = { ...mockProduct, price: 199.99 };
    expect(component.getBadgeText()).toBe('BUDGET');
    
    // Test standard price
    component.product = { ...mockProduct, price: 500 };
    expect(component.getBadgeText()).toBe('POPULAR');
    
    // Test premium price
    component.product = { ...mockProduct, price: 1500 };
    expect(component.getBadgeText()).toBe('PREMIUM');
  });
});
