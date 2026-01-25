import { reactive } from 'vue';

export const toastState = reactive({
    isVisible: false,
    message: '',
    type: ''
});

export const toast = {
    success(message) {
        toastState.isVisible = true;
        toastState.message = message;
        toastState.type = 'success';
        this.timeout();
    },

    error(message) {
        toastState.isVisible = true;
        toastState.message = message;
        toastState.type = 'error';
        this.timeout();
    },

    // To make the toast disappear after some time
    timeout() {
        setTimeout(() => {
            toastState.isVisible = false;
            toastState.message = '';
            toastState.type = '';
        }, 5000);
    }
};