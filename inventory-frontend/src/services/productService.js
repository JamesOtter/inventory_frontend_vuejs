import http from "../http-common";

// To interact with the backend API for products

class ProductService {
  getProducts() {
    return http.get("/products");
  }
}

export default new ProductService();