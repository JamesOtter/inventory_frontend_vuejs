<template>
    <div>
        <h1>Product List</h1>
        <table>
            <thead>
                <th>Product ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import productService from '../services/ProductService';

    export default {
        name: 'Products',
        data() {
            return {
                products: []
            };
        },
        methods: {
            getProducts() {
                productService.getProducts()
                    .then(response => {
                        this.products = response.data;
                    }).catch(e => {
                        console.log(e);
                    });
            }
        },
        created() {
            this.getProducts();
        }
    };
</script>