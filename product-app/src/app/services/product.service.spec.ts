import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from '../models/product';

/**
 * Unit tests for ProductService
 * 
 * Tests functionality including:
 * - Service creation
 * - HTTP requests for retrieving products
 * - Error handling
 */
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  
  // Mock products data for testing
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
    }
  ];

  /**
   * Test setup - runs before each test
   * Configures the testing module with the service and HTTP testing utilities
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    
    // Inject the service and the HTTP testing controller
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  /**
   * Clean up after each test by verifying no outstanding HTTP requests
   */
  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Basic test to verify service creation
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  /**
   * Tests the getProducts method for retrieving all products
   */
  it('should retrieve all products via HTTP GET', () => {
    // Call the service method
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
    
    // Set up the mock HTTP request
    const req = httpMock.expectOne('assets/mock-data/products.json');
    
    // Verify request method
    expect(req.request.method).toBe('GET');
    
    // Resolve the request with mock data
    req.flush(mockProducts);
  });
  
  /**
   * Tests the getProduct method for retrieving a single product by ID
   */
  it('should retrieve a single product by ID', () => {
    const targetId = 1;
    const targetProduct = mockProducts[0];
    
    // Call the service method
    service.getProduct(targetId).subscribe(product => {
      expect(product).toEqual(targetProduct);
    });
    
    // Set up the mock HTTP request
    const req = httpMock.expectOne('assets/mock-data/products.json');
    
    // Verify request method
    expect(req.request.method).toBe('GET');
    
    // Resolve the request with mock data
    req.flush(mockProducts);
  });
  
  /**
   * Tests error handling in the getProducts method
   */
  it('should handle errors when retrieving products', () => {
    // Spy on console.error to verify error logging
    spyOn(console, 'error');
    
    // Call the service method
    service.getProducts().subscribe(products => {
      // Should return an empty array on error
      expect(products).toEqual([]);
    });
    
    // Set up the mock HTTP request
    const req = httpMock.expectOne('assets/mock-data/products.json');
    
    // Simulate an error response
    req.error(new ErrorEvent('Network error'));
    
    // Verify error was logged
    expect(console.error).toHaveBeenCalled();
  });
  
  /**
   * Tests error handling in the getProduct method
   */
  it('should handle errors when retrieving a single product', () => {
    // Spy on console.error to verify error logging
    spyOn(console, 'error');
    
    // Call the service method
    service.getProduct(1).subscribe(product => {
      // Should return undefined on error
      expect(product).toBeUndefined();
    });
    
    // Set up the mock HTTP request
    const req = httpMock.expectOne('assets/mock-data/products.json');
    
    // Simulate an error response
    req.error(new ErrorEvent('Network error'));
    
    // Verify error was logged
    expect(console.error).toHaveBeenCalled();
  });
});
