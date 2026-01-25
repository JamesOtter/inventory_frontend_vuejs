<template>
    <div class="login-container">
        <h1 class="text-3xl font-bold mb-6 place-self-center">Login</h1>

        <form @submit.prevent="login" class="grid grid-cols-1 gap-4 place-self-center w-xs">
            <div>
                <label class="input">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input 
                        type="email" 
                        v-model="email"
                        placeholder="example@site.com" 
                        required
                    />
                </label>
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                </p>
            </div>
            
            <div>
                <label class="input">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        v-model="password"
                        required
                        placeholder="Password"
                    />
                </label>
                <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                    {{ errors.password }}
                </p>
            </div>

            <p v-if="errors.general" class="text-red-500 text-sm mt-1">
                {{ errors.general }}
            </p>
            
            <button class="btn btn-neutral mt-2">Login</button>

            <div class="place-self-center">Don't have an account? <a href="/register" class="text-blue-500">Register</a></div>
        </form>
    </div>
</template>

<script>
    import AuthService from '../../services/AuthService';
    import { authState as auth } from '../../store/Auth';   
    import { toast } from '../../store/Toast';

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
                errors: {}
            };
        },
        methods: {
            login() {
                // Reset old errors
                this.errors = {};

                // Create user object to get input data
                const user = {
                    email: this.email,
                    password: this.password
                };

                AuthService.login(user)
                    .then(response => {
                        auth.login(response.data.token);
                        toast.success('Logged in successfully!');
                        this.$router.push('/');
                    })
                    .catch(error => {
                        if(error.response && error.response.data.errors) {
                            this.errors = error.response.data.errors;

                            if(this.errors.general) {
                                this.password = '';
                            }
                        } else {
                            // Other errors such as network issues / server down
                            this.errors.general = 'Something went wrong. Please try again.';
                        }
                    });
            }
        }
    }
</script>