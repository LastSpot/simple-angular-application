# Angular Product App

This is a modern Angular application that demonstrates component-based architecture, services, routing, and basic API integration with mock data. The application features a responsive, visually appealing UI for browsing and viewing product details.

## Features

- Product listing with grid display and filtering options
- Detailed product information pages
- Modern UI with animations and responsive design
- Navigation between views
- Mock API integration using RxJS Observables

## Project Structure

The project is organized in the following structure:

```
simple-angular-application/
├── README.md (this file)
└── product-app/ (main application directory)
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── product-card/
    │   │   │   ├── product-list/
    │   │   │   └── product-detail/
    │   │   ├── services/
    │   │   │   └── product.service.ts
    │   │   ├── models/
    │   │   │   └── product.ts
    │   │   └── ...
    │   ├── assets/
    │   │   └── mock-data/
    │   │       └── products.json
    │   └── ...
    └── ...
```

### Components

- **ProductCardComponent**: Displays individual product cards with image, name, price, and actions
- **ProductListComponent**: Displays a list of products with filtering and search features
- **ProductDetailComponent**: Shows detailed information about a selected product

### Services

- **ProductService**: Provides product data from a mock JSON file using Observables

### Models

- **Product**: Interface defining the product structure (id, name, price, description)

## Setting Up on a New Computer

Follow these steps to set up and run the project on a new laptop:

1. **Prerequisites**:
   - Install [Node.js](https://nodejs.org/) (LTS version recommended)
   - Install [Git](https://git-scm.com/downloads)

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/simple-angular-application.git
   cd simple-angular-application
   ```

3. **Install Angular CLI**:
   ```bash
   npm install -g @angular/cli
   ```

4. **Install Project Dependencies**:
   ```bash
   cd product-app
   npm install
   ```

5. **Start the Development Server**:
   ```bash
   ng serve
   ```

6. **Access the Application**:
   Open your browser and navigate to `http://localhost:4200/`

## Deployment

To build the application for production:

1. Navigate to the product-app directory:
   ```bash
   cd product-app
   ```

2. Run the build command:
   ```bash
   ng build --configuration production
   ```

3. The build artifacts will be stored in the `dist/product-app` directory

## Troubleshooting

### Assets Not Loading

If you encounter issues with assets not loading (e.g., HTTP errors when trying to load JSON files from the assets directory), make sure the assets configuration is properly set up in your `angular.json` file:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  },
  {
    "glob": "**/*",
    "input": "src/assets",
    "output": "/assets/"
  }
]
```

This ensures that files in the `src/assets` directory are properly copied to the output directory during build.

### Running on Different Port

If port 4200 is already in use, you can specify a different port:

```bash
ng serve --port 4201
```

### SCSS Compilation Issues

If you encounter SCSS compilation issues with functions like `darken()`, we've used direct color values instead of SCSS color functions to ensure compatibility with Angular's SCSS compiler.

## Development Commands

- **Generate New Component**:
  ```bash
  ng generate component path/component-name
  ```

- **Generate New Service**:
  ```bash
  ng generate service path/service-name
  ```

- **Generate New Interface**:
  ```bash
  ng generate interface path/interface-name
  ```

- **Run Tests**:
  ```bash
  ng test
  ```

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [RxJS Documentation](https://rxjs.dev/)
