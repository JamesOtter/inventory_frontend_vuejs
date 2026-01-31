<template>
  <div v-if="totalPages > 1" class="flex justify-between items-center mt-4">
    <span class="text-sm text-gray-500">
      Page {{ currentPage + 1 }} of {{ totalPages }}
    </span>

    <div class="flex gap-2">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 0"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page - 1)"
        :class="[
          'px-3 py-1 border rounded',
          currentPage === page - 1 ? 'bg-blue-500 text-white' : ''
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages - 1"
        class="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change'],
  methods: {
    changePage(page) {
      if (page < 0 || page >= this.totalPages) return;
      this.$emit('page-change', page);
    }
  }
};
</script>
