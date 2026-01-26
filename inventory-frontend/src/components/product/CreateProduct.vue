<template>
    <div class="m-4">
        
        <h1 class="text-2xl font-bold place-self-center">Create Product</h1>

        <form @submit.prevent="createProduct" class="grid grid-cols-1 gap-2 place-self-center w-xs m-4">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Product Name</legend>
                <input v-model="name" type="text" class="input" placeholder="Product name" required/>
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                    {{ errors.name }}
                </p>
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Product Description</legend>
                <textarea v-model="description" class="textarea h-12" placeholder="Describe your product..."></textarea>
                <p class="label">Optional</p>
                <p v-if="errors.description" class="text-red-500 text-sm mt-1">
                    {{ errors.description }}
                </p>
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Quantity</legend>
                <input v-model="quantity" type="number" min="0" class="input" placeholder="Product stock quantity" required/>
                <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">
                    {{ errors.quantity }}
                </p>
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Price</legend>
                <label class="input">
                    RM
                    <input v-model="price" type="number" min="0.01" step="0.01" placeholder="Product price" required/>
                </label>
                <p v-if="errors.price" class="text-red-500 text-sm mt-1">
                    {{ errors.price }}
                </p>
            </fieldset>

            <p v-if="errors.general" class="text-red-500 text-sm mt-1">
                {{ errors.general }}
            </p>

            <button class="btn btn-primary mt-2">Add Product</button>
        </form>

    </div>
</template>

<script>
import productService from '../../services/ProductService';
import { toast } from '../../store/Toast';

export default {
    name: 'CreateProduct',
    data() {
        return {
            name: '',
            description: '',
            quantity: 0,
            price: 0.01,
            errors: {}
        };
    },
    methods: {
        createProduct() {
            this.errors = {};

            const productData = {
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity
            };

            productService.createProduct(productData)
                .then(() => {
                    toast.success('Product created successfully!');
                    this.$router.push('/');
                })
                .catch(error => {
                    console.log(error);
                    if(error.response && error.response.data.errors) {
                        this.errors = error.response.data.errors;
                    } else {
                        this.errors.general = 'Something went wrong. Please try again.';
                    }
                });
        }
    }
}
</script>