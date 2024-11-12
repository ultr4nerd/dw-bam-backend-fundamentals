<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchProducts() {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:3000/products')
    products.value = response.data.products
  } catch {
    error.value = 'Failed to load products. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div>
    <h1>Product List</h1>
    <div v-if="loading">Loading products...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="products.length > 0">
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
