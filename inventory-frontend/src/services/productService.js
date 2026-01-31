import http from "../http-common";

// To interact with the backend API for products

class ProductService {
  getProducts(page = 0, size = 10, keyword = '') {
    return http.get("/products", {
      params: { 
        page: page, 
        size: size, 
        keyword: keyword 
      }
    });
  };
  createProduct(product) {
    return http.post("/products", product);
  };
  updateProduct(id, product) {
    return http.put(`/product/${id}`, product);
  };
  deleteProduct(id) {
    return http.delete(`/product/${id}`);
  };
}

export default new ProductService();