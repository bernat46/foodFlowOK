<template>
  <div>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Stocks</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="body">
          <div class="header ion-padding">
            <ion-button @click="openOrderModal()">Create Order</ion-button>
            <ion-button @click="openReceiveModal()">Receive Order</ion-button>
          </div>
        </div>
        <ion-list>
          <ion-list-header>
            <h2>Orders</h2>
          </ion-list-header>
          <ion-item v-for="order in orders" :key="order.id" @click="viewOrderDetails(order)">
            <ion-label>
              <h2>{{ order.title }}</h2>
              <p>Date: {{ order.date }}</p>
              <p>Status: {{ order.status }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>

    <ion-modal
      v-if="showOrderModal"
      :is-open="showOrderModal"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
    >
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Create Order</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showOrderModal = false">
              <ion-icon slot="icon-only" :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div>
          <ion-item>
            <ion-select
              v-model="selectedProvider"
              :label="common.proveedor"
              label-placement="floating"
              @ionChange="fetchProviderProducts(selectedProvider)"
              :disabled="addedProducts.length > 0"
            >
              <ion-select-option
                v-for="provider in proveidors"
                :key="provider.id"
                :value="provider.id"
                >{{ provider.title }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="providerProducts.length > 0">
            <ion-select
              v-model="selectedProduct"
              :label="common.producto"
              label-placement="floating"
            >
              <ion-select-option
                v-for="product in providerProducts"
                :key="product.id"
                :value="product"
                >{{ product.name }}</ion-select-option
              >
            </ion-select>
            <ion-item>
              <ion-input
                v-model="selectedProductQuantity"
                type="number"
                :placeholder="selectedProduct ? `Cantidad (${selectedProduct.unit})` : 'Cantidad'"
              ></ion-input>
            </ion-item>
            <ion-button @click="addProductToOrder()">Add Product</ion-button>
          </ion-item>
          <!-- Productes afegits al modal -->
          <div class="product-list">
            <ion-list-header>Productes</ion-list-header>
            <ion-list>
              <ion-item v-for="(product, index) in addedProducts" :key="index">
                <ion-row class="order-product">
                  <ion-col size-xs="4">
                    <ion-label>{{ product.name }}</ion-label>
                  </ion-col>
                  <ion-col size-xs="4">
                    <ion-input
                  v-model="product.quantity"
                  type="number"
                  :placeholder="product.unit ? `Cantidad (${product.unit})` : 'Cantidad'"
                ></ion-input>
                  </ion-col>
                 <ion-col size-xs="2">
                  <p>{{ product.unit}}</p>
                 </ion-col>
                <ion-col size-xs="2">
                  <ion-icon :icon="trashOutline" class="icon" @click="removeProduct(index)"></ion-icon>
                </ion-col>
                
                </ion-row>
              </ion-item>
            </ion-list>
          </div>
        </div>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button fill="solid" color="primary" @click="createOrder()">{{
              common.guardar
            }}</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-modal>    

    <!-- Rebre ordre -->
    <ion-modal
      v-if="showReceiveModal"
      :is-open="showReceiveModal"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
    >
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Receive Order</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showReceiveModal = false">
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      </ion-content>
    </ion-modal>

    <!-- Modal detalls de la ordre -->
    <ion-modal v-if="showOrderDetailsModal" :is-open="showOrderDetailsModal">
      <ion-content>
  
        <h2>{{ selectedOrder.title }}</h2>
        <p>Date: {{ selectedOrder.date }}</p>
        <p>Status: {{ selectedOrder.status }}</p>
        <!-- LListar productes -->
        <ion-list>
          <ion-list-header>Products</ion-list-header>
          <ion-item v-for="(product, index) in selectedOrder.products" :key="index">
            <ion-label>{{ product.name }}</ion-label>
            <ion-label slot="end">{{ product.quantity }} {{ product.unit }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button @click="showOrderDetailsModal = false">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-modal>
  </div>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonList,
  IonListHeader,
  IonCol,
  IonIcon,
  IonRow,
  IonInput
} from "@ionic/vue";
import { ref } from "vue";
import { trashOutline } from "ionicons/icons";


const proveidors = ref([
  {
    id: 1,
    title: "Provider 1",
    products: [
      { id: 1, name: "Product 1", quantity: ref(null), unit: "g" },
      { id: 2, name: "Product 2", quantity: ref(null), unit: "kg" },
    ],
  },
  {
    id: 2,
    title: "Provider 2",
    products: [
      { id: 3, name: "Product 3", quantity: ref(null), unit: "BOX/10" },
      { id: 4, name: "Product 4", quantity: ref(null), unit: "KG" },
    ],
  },
]);

const orders = ref([
  {
    id: 1,
    title: "Order num 12345", provider_id: "1", date: "24/07/2024", status:"ordered",
    products: [
      { id: 3, name: "Product 3", quantity: "10", unit: "BOX/10" },
      { id: 4, name: "Product 3", quantity: "5", unit: "BOX/10" }
    ]
  },
  {
    id: 2,
    title: "Order num 456901", provider_id: "1", date: "01/02/2023", status:"ordered",
    products: [
      { id: 3, name: "Product 3", quantity: "10", unit: "BOX/10" },
      { id: 4, name: "Product 3", quantity: "5", unit: "BOX/10" }
    ]
  }
])


const common = {
  proveedor: "Proveedor",
  producto: "Producto",
  guardar: "Guardar",
  cantidad: "Cantidad"
};

const showOrderModal = ref(false);
const showReceiveModal = ref(false);
const selectedProvider = ref(null);
const selectedProduct = ref(null);
const selectedProductQuantity = ref(null);
const providerProducts = ref([]);
const addedProducts = ref([]);
const selectedOrder = ref(null);
const showOrderDetailsModal = ref(false);


const openOrderModal = () => {
  showOrderModal.value = true;
};

const viewOrderDetails = (order) => {
  // Order seleccionada al obrir modal
  selectedOrder.value = order;
  // Obrir modal
  showOrderDetailsModal.value = true;
};

const openReceiveModal = () => {
  showReceiveModal.value = true;
};

const fetchProviderProducts = (providerId) => {
  // Proveidor seleccionat del select de proveidors
  const selectedProviderData = proveidors.value.find(
    (provider) => provider.id === providerId
  );
  // Selecionnar els productes del proveidor seleccionat previament
  providerProducts.value = selectedProviderData
    ? selectedProviderData.products
    : [];
};

const addProductToOrder = () => {
  if (selectedProduct.value) {
    selectedProduct.value.quantity = selectedProductQuantity.value;
    addedProducts.value.push(selectedProduct.value);
    selectedProduct.value = null; // Reset selected product
    selectedProductQuantity.value = null; // Reset selected product quantity
  }
};

const removeProduct = (index) => {
  addedProducts.value.splice(index, 1);
};

const createOrder = () => {
  const newOrder = {
    id: orders.value.length + 1, // Id unic ordres
    title: `Order num ${orders.value.length + 1}`, //Titol d'exemple
    provider_id: selectedProvider.value, // Id de proveidor
    date: new Date().toLocaleDateString(), // Data
    status: "ordered", // Status ordered
    products: addedProducts.value.map(product => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      unit: product.unit
    })) // Grabar productes per la cantitat i la unitat 
  };
  orders.value.push(newOrder); // Afegir ordre
  // Reset el modal
  addedProducts.value = [];
  showOrderModal.value = false; // Tanca modal
};


</script>

<style scoped>
.product-list {
  overflow-y: auto;
  max-height: 300px;
}

.order-product{
  width: 100%;
  align-items: center;
}
</style>
