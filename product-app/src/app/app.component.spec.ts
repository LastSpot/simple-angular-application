/**
 * AppComponent Tests
 * 
 * This spec file contains unit tests for the root AppComponent.
 * It verifies that:
 * - The component can be created successfully
 * - The component has the expected title property
 * - The component renders expected content in the DOM
 */

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  /**
   * Test setup
   * Configures the testing module with the AppComponent import
   * before each test is run
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  /**
   * Test: Component Creation
   * Verifies that the component instance can be successfully created
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test: Title Property
   * Verifies that the component has the expected title property value
   */
  it(`should have the 'product-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('product-app');
  });

  /**
   * Test: DOM Rendering
   * Verifies that the component renders the expected title in the DOM
   * Note: This test may need to be updated if the HTML template changes
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, product-app');
  });
});
