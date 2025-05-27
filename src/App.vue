<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const drawer = ref(false);
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ShieldTech - Anti-5G Protection</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-badge content="0" color="error">
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item to="/" prepend-icon="mdi-home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group value="Products">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-shield-home" title="Products"></v-list-item>
          </template>
          <v-list-item to="/products/shielding" title="Shielding Materials"></v-list-item>
          <v-list-item to="/products/wearables" title="Wearable Protection"></v-list-item>
          <v-list-item to="/products/home" title="Home Protection"></v-list-item>
          <v-list-item to="/products/measurement" title="Measurement Devices"></v-list-item>
        </v-list-group>
        <v-list-item to="/radiation-calculator" prepend-icon="mdi-calculator">
          <v-list-item-title>Radiation Calculator</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about" prepend-icon="mdi-information">
          <v-list-item-title>About Us</v-list-item-title>
        </v-list-item>
        <v-list-item to="/contact" prepend-icon="mdi-email">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-0">
        <RouterView></RouterView>
      </v-container>
    </v-main>

    <v-footer app color="primary" class="white--text">
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          &copy; {{ new Date().getFullYear() }} ShieldTech - Your Protection Against 5G Radiation
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style>
/* Add global styles here */
</style>
