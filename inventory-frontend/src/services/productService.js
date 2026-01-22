import http from "../http-common";

// To interact with the backend API for products

class ProductService {
  getAll() {
    return http.get("/products");
  }
}

export default new ProductService();