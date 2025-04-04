/**
 * Product Interface
 * 
 * Defines the data structure for product objects throughout the application.
 * Used by ProductService and various components to ensure consistent data typing.
 */
export interface Product {
  /** Unique identifier for the product */
  id: number;
  
  /** Display name of the product */
  name: string;
  
  /** Price of the product in decimal format */
  price: number;
  
  /** Detailed description of the product features */
  description: string;
}
