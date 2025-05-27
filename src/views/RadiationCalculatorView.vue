<template>
  <v-container class="my-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6">
          <v-card-title class="text-h4 mb-6 text-center">
            <v-icon large left>mdi-radar</v-icon>
            EMF Exposure Calculator
          </v-card-title>
          
          <v-card-text>
            <!-- Step 1: Device Selection -->
            <div v-if="currentStep === 1" class="mb-6">
              <h3 class="text-h6 mb-4">Select the devices you use:</h3>
              <v-checkbox
                v-for="device in devices"
                :key="device.id"
                v-model="device.selected"
                :label="device.name"
                hide-details
                class="mb-2"
              ></v-checkbox>
            </div>

            <!-- Step 2: Living Situation -->
            <div v-if="currentStep === 2" class="mb-6">
              <h3 class="text-h6 mb-4">Your Living Situation</h3>
              
              <v-select
                v-model="formData.homeType"
                :items="['House', 'Apartment', 'Condo']"
                label="Type of Home"
                outlined
                dense
                class="mb-4"
              ></v-select>

              <v-row v-if="formData.homeType === 'Apartment' || formData.homeType === 'Condo'">
                <v-col cols="6">
                  <v-text-field
                    v-model.number="formData.floorNumber"
                    type="number"
                    min="1"
                    label="Your Floor"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="formData.totalFloors"
                    type="number"
                    min="1"
                    label="Total Floors"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>


              <v-checkbox
                v-model="formData.cellTowerNearby"
                label="Is there a cell tower near your home?"
                hide-details
                class="mb-4"
              ></v-checkbox>

              <v-checkbox
                v-model="formData.workCellTower"
                label="Is there a cell tower near your workplace?"
                hide-details
              ></v-checkbox>
            </div>

            <!-- Results -->
            <div v-if="currentStep === 3" class="text-center">
              <v-icon
                size="80"
                :color="exposureScore > 70 ? 'error' : exposureScore > 40 ? 'warning' : 'success'"
                class="mb-4"
              >
                {{ exposureIcon }}
              </v-icon>
              <h3 class="text-h5 mb-2">
                {{ exposureLevel }} Exposure
              </h3>
              <p class="mb-4">{{ exposureDescription }}</p>
              
              <v-divider class="my-4"></v-divider>
              
              <h4 class="text-h6 mb-3">Your Devices:</h4>
              <v-chip
                v-for="device in selectedDevices"
                :key="device.id"
                class="ma-1"
                color="primary"
                text-color="white"
              >
                {{ device.name }}
              </v-chip>
              
              <!-- Recommended Products -->
              <v-divider class="my-4"></v-divider>
              <h4 class="text-h6 mb-3">Recommended Protection:</h4>
              <v-row v-if="exposureScore > 30">
                <v-col cols="12" sm="6" v-for="product in recommendedProducts" :key="product.id">
                  <v-card :to="`/products/${product.id}`" class="h-100" outlined>
                    <v-img :src="product.image" height="120" cover></v-img>
                    <v-card-text class="pa-3">
                      <div class="text-subtitle-2 font-weight-bold">{{ product.name }}</div>
                      <div class="text-caption text-medium-emphasis">${{ product.price }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <p v-else class="text-medium-emphasis">Your exposure is low. No specific products recommended at this time.</p>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="currentStep > 1"
              text
              @click="currentStep--"
            >
              Back
            </v-btn>
            <v-btn
              v-if="currentStep < 3"
              color="primary"
              @click="currentStep++"
              :disabled="currentStep === 1 && !hasSelectedDevices"
            >
              {{ currentStep === 2 ? 'Calculate' : 'Next' }}
            </v-btn>
            <v-btn
              v-else
              color="primary"
              @click="resetForm"
            >
              Start Over
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Device {
  id: string;
  name: string;
  selected: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const currentStep = ref(1);

// Device selection
const devices = ref<Device[]>([
  { id: 'phone', name: 'Smartphone', selected: false },
  { id: 'laptop', name: 'Laptop', selected: false },
  { id: 'tablet', name: 'Tablet', selected: false },
  { id: 'wifi', name: 'Wi-Fi Router', selected: false },
  { id: 'smartwatch', name: 'Smartwatch', selected: false },
  { id: 'bluetooth', name: 'Bluetooth Devices', selected: false },
]);

// Form data
const formData = ref({
  homeType: 'House',
  floorNumber: 1,
  totalFloors: 1,
  cellTowerNearby: false,
  workCellTower: false,
});

// Sample product data - in a real app, this would come from your backend
const recommendedProducts: Product[] = [
  {
    id: 'emf-shielding-paint',
    name: 'EMF Shielding Paint',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1581093196270-6682cdefb51e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'emf-protection-hat',
    name: 'EMF Protection Hat',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'emf-meter',
    name: 'EMF Meter',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1581093057303-5001a3f76b4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'phone-shielding-case',
    name: 'Phone Shielding Case',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1511707171639-5adb0d6eef34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

// Computed properties
const selectedDevices = computed(() => 
  devices.value.filter(device => device.selected)
);

const hasSelectedDevices = computed(() => 
  selectedDevices.value.length > 0
);

const exposureScore = computed(() => {
  let score = 0;
  
  // Base score from devices
  score += selectedDevices.value.length * 10;
  
  // Additional points for high-exposure factors
  if (formData.value.cellTowerNearby) score += 20;
  if (formData.value.workCellTower) score += 15;
  
  // Adjust for apartment living (higher floors get more exposure)
  if ((formData.value.homeType === 'Apartment' || formData.value.homeType === 'Condo') && 
      formData.value.floorNumber > formData.value.totalFloors / 2) {
    score += 10;
  }
  
  return Math.min(100, score);
});

const exposureLevel = computed(() => {
  if (exposureScore.value > 70) return 'High';
  if (exposureScore.value > 40) return 'Moderate';
  return 'Low';
});

const exposureIcon = computed(() => {
  if (exposureScore.value > 70) return 'mdi-alert-circle';
  if (exposureScore.value > 40) return 'mdi-alert';
  return 'mdi-check-circle';
});

const exposureDescription = computed(() => {
  if (exposureScore.value > 70) {
    return 'Consider taking steps to reduce your EMF exposure.';
  } else if (exposureScore.value > 40) {
    return 'Your exposure is moderate. Consider some protective measures.';
  } else {
    return 'Your exposure is within safe limits.';
  }
});

// Methods
const resetForm = () => {
  currentStep.value = 1;
  devices.value.forEach(device => device.selected = false);
  formData.value = {
    homeType: 'House',
    floorNumber: 1,
    totalFloors: 1,
    cellTowerNearby: false,
    workCellTower: false,
  };
};
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>
