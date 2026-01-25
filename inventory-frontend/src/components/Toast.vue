<template>
    <div v-if="toast.isVisible" class="toast toast-top toast-center mt-14">
        <div v-if="toast.type === 'success'" class="alert alert-success">
            <span>{{ toast.message }}</span>
        </div>
        <div v-if="toast.type === 'error'" class="alert alert-error">
            <span>{{ toast.message }}</span>
        </div>
    </div>
</template>

<script>
import { toastState as toast } from '../store/Toast';

export default {
    setup() {
        return { toast };
    }
};
</script>