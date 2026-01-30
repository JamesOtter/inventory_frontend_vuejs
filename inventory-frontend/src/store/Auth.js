import { reactive } from "vue";

export const authState = reactive({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem("token"),
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    role: localStorage.getItem('role') || null,

    login(data) {
        this.token = data.token;
        this.isLoggedIn = true;
        this.username = data.username;
        this.email = data.email;
        this.role = data.role;
        
        localStorage.setItem("token", this.token);
        localStorage.setItem("username", this.username);
        localStorage.setItem("email", this.email);
        localStorage.setItem("role", this.role);
    },

    logout() {
        this.token = null;
        this.isLoggedIn = false;
        this.username = null;
        this.email = null;
        this.role = null;

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
    }
});