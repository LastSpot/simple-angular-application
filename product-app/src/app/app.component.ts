import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent - Root Application Component
 * 
 * This is the main entry component that serves as the container for the entire application.
 * It provides the basic layout structure including:
 * - Header with branding, navigation links, and user action buttons
 * - Main content area that dynamically loads routed components
 * - Footer with company information, links, and copyright
 * 
 * The component uses a flex-based layout to ensure the footer stays at the bottom
 * even when content doesn't fill the viewport height.
 * 
 * @usesTemplates
 * - app.component.html - Contains the structural layout
 * - app.component.scss - Contains all styling for the layout
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /** 
   * Application title 
   * Used for browser title bar and possibly header branding
   */
  title = 'product-app';
}
