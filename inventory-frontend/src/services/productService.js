import http from "../http-common";

// To interact with the backend API for products

class ProductService {
  getProducts(keyword = '') {
    return http.get("/products", {
      params: { keyword: keyword }
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