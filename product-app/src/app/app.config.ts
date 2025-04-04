import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

/**
 * Application Configuration
 * 
 * Configures the core providers for the Angular application:
 * - Zone.js change detection with event coalescing for performance
 * - Router configuration using routes defined in app.routes.ts
 * - Client hydration for server-side rendering support
 * - HttpClient for making API requests
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zone.js change detection with event coalescing for better performance
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // Configure the router with application routes
    provideRouter(routes), 
    // Enable client hydration for server-side rendering support
    provideClientHydration(withEventReplay()),
    // Configure HttpClient for API requests (used by ProductService)
    provideHttpClient()
  ]
};
