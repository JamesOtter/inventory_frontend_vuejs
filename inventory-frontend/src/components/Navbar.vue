<template>
    <div>
        <div class="navbar bg-base-100 shadow-sm mb-4">
            <div class="navbar-start">
                <a href="/" class="text-xl font-bold mx-4">daisyUI</a>
            </div>

            <div class="navbar-center font-semibold hidden lg:flex">
                <ul class="menu menu-horizontal px-1 gap-2">
                    <li v-if="auth.isLoggedIn"><a href="/" :class="navClass('/')">Products</a></li>
                    <li v-if="auth.role == 'ROLE_ADMIN'"><a href="/auditlog" :class="navClass('/auditlog')">Audit Log</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>

            <div class="navbar-end">
                <ul v-if="!auth.isLoggedIn" class="menu menu-horizontal px-1 gap-2">
                    <li><a href="/register" :class="navClass('/register')">Register</a></li>
                    <li><a href="/login" :class="navClass('/login')">Login</a></li>
                </ul>
                <ul v-if="auth.isLoggedIn" class="menu menu-horizontal px-1 gap-2">
                    <p class="place-self-center">{{ auth.username }} ( {{ auth.email }} )</p>
                    <p class="place-self-center">|</p>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { authState as auth } from '../store/Auth';
    
    export default {
        setup() {
            return { auth };
        },
        methods: {
            logout() {
                auth.logout();
                this.$router.push('/login');
            },
            // Highlight the active nav link
            navClass(path) {
                return this.$route.path === path ? 'bg-gray-200' : '';
            }
        }
    };
</script>