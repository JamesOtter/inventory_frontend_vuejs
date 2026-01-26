<template>
    <div class="m-10">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">My Products</h1>
            <a href="/product/create" class="btn btn-primary">Add Product</a>
        </div>
        
        <div v-if="products.length > 0">
            <div class="overflow-x-auto rounded-box border bg-base-100 border-slate-300 shadow-sm">
                <table class="table table-pin-rows">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id" class="hover:bg-base-300">
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.user.username }}</td>
                            <td>
                                <button 
                                    class="btn btn-sm btn-info mr-2" 
                                    onclick="edit_modal.showModal()"
                                    @click="openEditModal(product)"
                                >
                                    Edit
                                </button>
                                <button 
                                    class="btn btn-sm btn-error"
                                    onclick="delete_modal.showModal()"
                                    @click="openDeleteModal(product)"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Modal - For Edit Action -->
            <dialog id="edit_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 class="text-xl font-bold place-self-center">Update Product</h3>

                    <form @submit.prevent="updateProduct" class="grid grid-cols-1 gap-2 place-self-center w-xs m-4">
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Product Name</legend>
                            <input v-model="editForm.name" type="text" class="input" placeholder="Product name" required/>
                            <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                                {{ errors.name }}
                            </p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Product Description</legend>
                            <textarea v-model="editForm.description" class="textarea h-10" placeholder="Describe your product..."></textarea>
                            <p class="label">Optional</p>
                            <p v-if="errors.description" class="text-red-500 text-sm mt-1">
                                {{ errors.description }}
                            </p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Quantity</legend>
                            <input v-model="editForm.quantity" type="number" min="0" class="input" placeholder="Product stock quantity" required/>
                            <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">
                                {{ errors.quantity }}
                            </p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Price</legend>
                            <label class="input">
                                RM
                                <input v-model="editForm.price" type="number" min="0.01" step="0.01" placeholder="Product price" required/>
                            </label>
                            <p v-if="errors.price" class="text-red-500 text-sm mt-1">
                                {{ errors.price }}
                            </p>
                        </fieldset>

                        <p v-if="errors.general" class="text-red-500 text-sm mt-1">
                            {{ errors.general }}
                        </p>

                        <button class="btn btn-primary mt-2">Update Product</button>
                    </form>
                </div>
            </dialog>

            <!-- Modal - For Delete Action -->
            <dialog id="delete_modal" class="modal">
                <div class="modal-box">
                    <div class="grid grid-cols-1 gap-2 place-items-center m-8">
                        <h3 class="text-lg font-bold">Are you sure you want to delete this product?</h3>
                        <p>Once product was deleted, it cannot be recovered.</p>
                        <button class="btn btn-error mt-6" @click="deleteProduct">Yes, delete</button>
                    </div>
                    
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
        <div v-else class="hero bg-base-200 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                <h1 class="text-5xl font-bold">Hello there!</h1>
                <p class="py-6">
                    We notice that you haven't created any products yet. Start adding products to manage your inventory effectively!
                </p>
                <a href="/product/create" class="btn btn-primary">Get Started</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import productService from '../../services/ProductService';
import { toast } from '../../store/Toast';

    export default {
        name: 'Products',
        data() {
            return {
                products: [],
                selectedProductId: null,
                editForm: {
                    name: '',
                    description: '',
                    quantity: 0,
                    price: 0.01
                },
                errors: {}
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
            },
            openEditModal(product) {
                this.errors = {};
                this.selectedProductId = product.id;

                this.editForm = {
                    name: product.name,
                    description: product.description,
                    quantity: product.quantity,
                    price: product.price
                };
            },
            openDeleteModal(product) {
                this.selectedProductId = product.id;
            },
            updateProduct() {
                this.errors = {};

                const productData = {
                    name: this.editForm.name,
                    description: this.editForm.description,
                    price: this.editForm.price,
                    quantity: this.editForm.quantity
                };

                productService.updateProduct(this.selectedProductId, productData)
                    .then(() => {
                        // To update the product in the list without refetching
                        const index = this.products.findIndex(p => p.id === this.selectedProductId);
                        if (index !== -1) {
                            Object.assign(this.products[index], productData);
                        }

                        // To close the modal
                        document.getElementById('edit_modal').close();
                        toast.success('Product updated successfully!');
                    })
                    .catch(error => {
                        console.log(error);
                        if(error.response && error.response.data.errors) {
                            this.errors = error.response.data.errors;
                        } else {
                            this.errors.general = 'Something went wrong. Please try again.';
                        }
                    });
            },
            deleteProduct() {
                productService.deleteProduct(this.selectedProductId)
                    .then(() => {
                        // To remove the product from the list without refetching
                        this.products = this.products.filter(p => p.id !== this.selectedProductId);

                        // To close the modal
                        document.getElementById('delete_modal').close();
                        toast.success('Product deleted successfully!');
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error('Failed to delete the product. Please try again.');
                    });
            }
        },
        created() {
            this.getProducts();
        }
    };
</script>