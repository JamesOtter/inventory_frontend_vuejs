import { reactive } from "vue";

export const authState = reactive({
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem("token"),

    login(token) {
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem("token", this.token);
    },

    logout() {
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem("token");
    }
});