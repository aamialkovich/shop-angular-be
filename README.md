# shop-angular-be

## Task 3

### Frontend

- [Frontend PR link](https://github.com/aamialkovich/shop-angular-cloudfront/pull/2/files)
- [Deployed Frontend App](https://d3d9d8hys7hok1.cloudfront.net/)

### Backend

- [x] Product Service Serverless config contains configuration for 2 lambda functions, API is not working at all, but YAML configuration is correct
- [x] The `getProductsList` OR `getProductsById` lambda function returns a correct response (POINT1)
- [x] The `getProductsById` AND `getProductsList` lambda functions return a correct response code (POINT2)
- [x] Your own Frontend application is integrated with Product Service (`/products` API) and products from Product Service are represented on Frontend. AND POINT1 and POINT2 are done.
- [x] Async/await is used in lambda functions
- [x] ES6 modules are used for Product Service implementation
- [x] Webpack is configured for Product Service
- [ ] SWAGGER documentation is created for Product Service
- [ ] Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered)
- [x] Lambda handlers (`getProductsList`, `getProductsById`) code is written not in 1 single module (file) and separated in codebase.
- [x] Main error scenarios are handled by API ("Product not found" error).
