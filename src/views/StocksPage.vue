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
            <ion-button @click="openOrderModal">{{ $t("stock.create_order") }}</ion-button>
            <ion-button @click="openStocksModal">{{ $t("stock.stocks") }}</ion-button>
          </div>
        </div>
        <ion-list>
          <ion-list-header>
            <h2>{{ $t("stock.orders") }}</h2>
          </ion-list-header>
          <ion-item v-for="order in orders" :key="order.id">
            <ion-label @click="viewOrderDetails(order)">
              <h2>{{ order.title }}</h2>
              <p>{{ $t("common.date") }}: {{ order.date }}</p>
              <p>{{ $t("stock.status") }}: {{ order.status }}</p>
            </ion-label>
            <ion-button @click="receiveOrder(order)" :disabled="order.status === 'received'">
              {{ $t("stock.receive_order") }}
            </ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>

    <ion-modal
      v-if="showOrderModal"
      :is-open="showOrderModal"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @willDismiss="showOrderModal = false"
    >
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>{{ $t("stock.create_order") }}</ion-title>
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
              :label="$t('stock.provider')"
              label-placement="floating"
              @ionChange="fetchProviderProducts(selectedProvider)"
              :disabled="addedProducts.length > 0"
            >
              <ion-select-option
                v-for="provider in providers"
                :key="provider.id"
                :value="provider.id"
              >{{ provider.title }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item v-if="providerProducts.length > 0">
            <ion-select
              v-model="selectedProduct"
              :label="$t('stock.product')"
              label-placement="floating"
            >
              <ion-select-option
                v-for="product in providerProducts"
                :key="product.id"
                :value="product"
              >{{ product.name }}</ion-select-option>
            </ion-select>
            <ion-item>
              <ion-input
                v-model="selectedProductQuantity"
                type="number"
                :placeholder="selectedProduct ? `Cantidad (${selectedProduct.unit})` : 'Cantidad'"
              ></ion-input>
            </ion-item>
            <ion-button @click="addProductToOrder">{{ $t("stock.add_product") }}</ion-button>
          </ion-item>
          <div class="product-list">
            <ion-list-header>{{ $t("stock.products") }}</ion-list-header>
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
            <ion-button fill="solid" color="primary" @click="createOrder">{{ $t("common.guardar") }}</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-modal>

    <!-- Modal detalls de la ordre -->
    <ion-modal v-if="showOrderDetailsModal" :is-open="showOrderDetailsModal" @willDismiss="showOrderDetailsModal = false">
      <ion-content>
        <h2>{{ selectedOrder.title }}</h2>
        <p>{{ $t("common.date", 1) }}: {{ selectedOrder.date }}</p>
        <p>{{ $t("stock.status", 1) }}: {{ selectedOrder.status }}</p>
        <ion-list>
          <ion-list-header>{{ $t("stock.products") }}</ion-list-header>
          <ion-item v-for="(product, index) in selectedOrder.products" :key="index">
            <ion-label>{{ product.name }}</ion-label>
            <ion-label slot="end">{{ product.quantity }} {{ product.unit }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button @click="showOrderDetailsModal = false">{{ $t("common.close") }}</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-modal>

    <!-- Stocks View Modal -->
    <ion-modal v-if="showStocksModal" :is-open="showStocksModal">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Stocks</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showStocksModal = false">
              <ion-icon slot="icon-only" :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-item>
          <ion-select
            v-model="selectedProviderForStocks"
            :label="$t('stock.provider')"
            label-placement="floating"
            @ionChange="fetchStocks(selectedProviderForStocks)"
          >
            <ion-select-option
              v-for="provider in providers"
              :key="provider.id"
              :value="provider.id"
            >{{ provider.title }}</ion-select-option>
          </ion-select>
        </ion-item>
        <div v-if="providerStocks.length > 0">
          <ion-list>
            <ion-list-header>{{ $t("stock.products") }}</ion-list-header>
            <ion-item v-for="(product, index) in providerStocks" :key="index">
              <ion-label>{{ product.name }}</ion-label>
              <ion-label slot="end">{{ product.quantity }} {{ product.unit }}</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button fill="solid" color="primary" @click="showStocksModal = false">
              {{ $t("common.close") }}
            </ion-button>
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
  IonInput,
  IonButtons,
  IonLabel,
  IonFooter,
} from "@ionic/vue";
import { reactive, ref } from "vue";
import { trashOutline, close } from "ionicons/icons";

// Original providers data
const providers = reactive([
  {
    id: 1,
    title: "Pastas gallo",
    products: [
      { id: 1, name: "Fideos", unit: "g" },
      { id: 2, name: "Spaghettis", unit: "kg" },
      { id: 3, name: "Estrellitas", unit: "g" },
      { id: 4, name: "Laminas lasaña", unit: "Caja/5" },

    ],
  },
  {
    id: 2,
    title: "Legumbres y precocinados",
    products: [
      { id: 5, name: "Garbanzos", unit: "kg" },
      { id: 6, name: "Lentejas", unit: "kg" },
      { id: 7, name: "Pasta con pesto", unit: "Caja/10" },

    ],
  },
  {
    id: 3,
    title: "Congelados",
    products: [
      { id: 8, name: "Rabas", unit: "kg" },
      { id: 9, name: "Merluza", unit: "u" },
      { id: 10, name: "Nuggets", unit: "Caja/20" },
      { id: 11, name: "Espinacas", unit: "kg" },
      { id: 12, name: "Masa Pizza", unit: "u" },
      { id: 13, name: "Salteado verduras", unit: "g" },
      

    ],
  },
  {
  id: 4,
  title: "Carnes Serrano",
  products: [
      { id: 14, name: "Butifarras", unit: "u" },
      { id: 15, name: "Lomo", unit: "kg" },
    ],
  },

]);

// Reactive stocks data using reactive
const stocks = reactive([
  {
    provider_id: 1,
    products: [
      { id: 1, quantity: 10 },
      { id: 2, quantity: 150 },
      { id: 3, quantity: 400 },
      { id: 4, quantity: 10 },
    ],
  },
  {
    provider_id: 2,
    products: [
      { id: 5, quantity: 3 },
      { id: 6, quantity: 5 },
      { id: 7, quantity: 2 },
    ],
  },
  {
    provider_id: 3,
    products: [
      { id: 8, quantity: 7 },
      { id: 9, quantity: 12 },
      { id: 10, quantity: 20 },
      { id: 11, quantity: 4 },
      { id: 12, quantity: 12 },
      { id: 13, quantity: 0 },
      
    ],
  },
  {
    provider_id: 4,
    products: [
      { id: 14, quantity: 10 },
      { id: 15, quantity: 0 },
    ]
  }
]);

// Orders data
const orders = reactive([
  {
    id: 1,
    title: "Order num 1",
    provider_id: "1",
    date: "24/07/2024",
    status: "ordered",
    products: [
      { id: 1, name: "Fideos", quantity: 1, unit: "g" },
      { id: 4, name: "Laminas lasaña", quantity: 2, unit: "Caja/5" },
      { id: 4, name: "Laminas lasaña", quantity: 10, unit: "Caja/5" },
      { id: 3, name: "Estrelliats", quantity: 3, unit: "g" },

    ],
  },
  {
    id: 2,
    title: "Order num 2",
    provider_id: "3",
    date: "01/02/2024",
    status: "ordered",
    products: [
      { id: 12, name: "Masa Pizza", quantity: 7, unit: "u" },
      { id: 8, name: "Rabas", quantity: 12, unit: "kg" },
    ],
  },
]);

const showOrderModal = ref(false);
const selectedProvider = ref(null);
const selectedProduct = ref(null);
const selectedProductQuantity = ref(null);
const providerProducts = ref([]);
const addedProducts = reactive([]);
const selectedOrder = ref(null);
const showOrderDetailsModal = ref(false);
const showStocksModal = ref(false);
const providerStocks = reactive([]);
const selectedProviderForStocks = ref(null);

const openOrderModal = () => {
  showOrderModal.value = true;
};

const viewOrderDetails = (order) => {
  selectedOrder.value = order;
  showOrderDetailsModal.value = true;
};

const openStocksModal = () => {
  showStocksModal.value = true;
  // We call fetchStocks only when the modal opens
  fetchStocks(selectedProviderForStocks.value);
};

const fetchStocks = (providerId) => {
  console.log("Fetching stocks for provider:", providerId);
  const providerStock = stocks.find((stock) => stock.provider_id === providerId);
  if (providerStock) {
    providerStocks.splice(0, providerStocks.length, ...providerStock.products.map((stockProduct) => {
      const productInfo = providers.find((provider) => provider.id === providerId)?.products.find((product) => product.id === stockProduct.id);
      return {
        ...stockProduct,
        name: productInfo?.name || "Unknown Product",
        unit: productInfo?.unit || "Unknown Unit",
        quantity: stockProduct.quantity, // Direct quantity from the stocks array
      };
    }));
  } else {
    providerStocks.splice(0, providerStocks.length); // Clear providerStocks
  }
};



const fetchProviderProducts = (providerId) => {
  const selectedProviderData = providers.find((provider) => provider.id === providerId);
  providerProducts.value = selectedProviderData ? selectedProviderData.products : [];
};

const addProductToOrder = () => {
  if (selectedProduct.value && selectedProductQuantity.value) {
    addedProducts.push({
      id: selectedProduct.value.id,
      name: selectedProduct.value.name,
      quantity: selectedProductQuantity.value,
      unit: selectedProduct.value.unit,
    });
    selectedProduct.value = null;
    selectedProductQuantity.value = null;
  }
};

const removeProduct = (index) => {
  addedProducts.splice(index, 1);
};

const createOrder = () => {
  const newOrder = {
    id: orders.length + 1,
    title: `Order num ${orders.length + 1}`,
    provider_id: selectedProvider.value,
    date: new Date().toLocaleDateString(),
    status: "ordered",
    products: addedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      unit: product.unit,
    })),
  };
  orders.push(newOrder);
  addedProducts.splice(0, addedProducts.length);
  showOrderModal.value = false;
};

const receiveOrder = (order) => {
  order.status = 'received';

  order.products.forEach((orderProduct) => {
    const providerIndex = stocks.findIndex((stock) => Number(order.provider_id) === stock.provider_id);

    if (providerIndex !== -1) {
      const productIndex = stocks[providerIndex].products.findIndex((product) => product.id === orderProduct.id);

      if (productIndex !== -1) {
        stocks[providerIndex].products[productIndex].quantity += parseInt(orderProduct.quantity);
      } else {
        // Add new product to existing provider stock
        stocks[providerIndex].products.push({
          id: orderProduct.id,
          quantity: parseInt(orderProduct.quantity),
        });
      }
    }
  });
};



</script>

<style>
/* Add your custom styles here */
.icon {
  cursor: pointer;
}
</style>
