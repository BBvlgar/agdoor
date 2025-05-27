<template>
  <div class="home">
    <!-- Hero Section -->
    <v-parallax
      src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      height="600"
      class="d-flex align-center"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="8" class="mx-auto text-center">
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-4 white--text">
              Protect Yourself from 5G Radiation
            </h1>
            <p class="text-h6 text-md-h5 mb-6 white--text">
              High-quality EMF protection products for your home, workplace, and on the go
            </p>
            <v-btn
              color="primary"
              x-large
              rounded
              to="/radiation-calculator"
              class="mr-4"
            >
              Check Your Exposure
            </v-btn>
            <v-btn
              outlined
              x-large
              rounded
              color="white"
              to="/products"
              class="white--text"
            >
              Shop Now
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <!-- Features Section -->
    <v-container class="my-12">
      <v-row class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 mb-4">Why Protect Against 5G?</h2>
          <p class="text-body-1 text--secondary max-width-800 mx-auto">
            5G technology brings faster speeds but also increased exposure to electromagnetic fields (EMF).
            Our products are scientifically designed to reduce your exposure to harmful radiation.
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col v-for="(feature, i) in features" :key="i" cols="12" md="4" class="text-center">
          <v-icon x-large color="primary" class="mb-4">{{ feature.icon }}</v-icon>
          <h3 class="text-h6 mb-3">{{ feature.title }}</h3>
          <p class="text-body-2 text--secondary">{{ feature.text }}</p>
        </v-col>
      </v-row>

      <!-- Featured Products -->
      <v-row class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h4 mb-6">Featured Products</h2>
        </v-col>
        <v-col
          v-for="(product, i) in featuredProducts"
          :key="`product-${i}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="h-100 d-flex flex-column" :to="`/product/${product.id}`">
            <v-img
              :src="product.image"
              height="200"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="text-white">{{ product.name }}</v-card-title>
            </v-img>
            <v-card-text class="flex-grow-1">
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-subtitle-1 font-weight-bold">${{ product.price }}</span>
                <v-chip small :color="product.inStock ? 'success' : 'grey'" text-color="white">
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </v-chip>
              </div>
              <p class="text-body-2">{{ product.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                block
                :disabled="!product.inStock"
                @click.prevent="addToCart(product)"
              >
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Call to Action -->
      <v-row class="mt-12">
        <v-col cols="12" class="text-center">
          <div class="pa-8 rounded-lg" style="background-color: #f5f5f5;">
            <h2 class="text-h4 mb-4">Not Sure Where to Start?</h2>
            <p class="text-body-1 mb-6">
              Use our Radiation Calculator to assess your exposure and get personalized
              product recommendations.
            </p>
            <v-btn color="primary" x-large to="/radiation-calculator">
              Start Radiation Assessment
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
}

const features = [
  {
    icon: 'mdi-shield-check',
    title: 'Proven Protection',
    text: 'Our products are tested and proven to reduce EMF exposure by up to 99%.',
  },
  {
    icon: 'mdi-medical-bag',
    title: 'Health Benefits',
    text: 'Reduce potential health risks associated with prolonged EMF exposure.',
  },
  {
    icon: 'mdi-home-heart',
    title: 'Whole-Home Solutions',
    text: 'From your bedroom to your office, we have protection for every space.',
  },
];

const featuredProducts: Product[] = [
  {
    id: 'emf-shielding-paint',
    name: 'EMF Shielding Paint',
    description: 'Special paint that blocks up to 99% of RF radiation from entering your home.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1581093196270-6682cdefb51e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: true,
    category: 'shielding',
  },
  {
    id: 'emf-protection-hat',
    name: 'EMF Protection Hat',
    description: 'Stylish hat with built-in silver thread to protect your head from EMF radiation.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: true,
    category: 'wearables',
  },
  {
    id: 'emf-meter',
    name: 'EMF Meter',
    description: 'Accurately measure EMF levels in your environment with this professional-grade meter.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1581093057303-5001a3f76b4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: true,
    category: 'measurement',
  },
  {
    id: 'phone-shielding-case',
    name: 'Phone Shielding Case',
    description: 'Blocks up to 95% of EMF radiation from your smartphone while allowing full functionality.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1511707171639-5adb0d6eef34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    inStock: false,
    category: 'wearables',
  },
];

const addToCart = (product: Product) => {
  // TODO: Implement add to cart functionality
  console.log('Added to cart:', product);
};
</script>

<style scoped>
.max-width-800 {
  max-width: 800px;
}

.v-card {
  transition: transform 0.3s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>
