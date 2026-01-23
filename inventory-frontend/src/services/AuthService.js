import http from "../http-common";

class AuthService {
    register(user) {
        return http.post("/auth/register", user);
    }
    
    login(user) {
        return http.post("/auth/login", user);
    }
}

export default new AuthService();