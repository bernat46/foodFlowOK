<template>
    <div>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Providers</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div class="body">
                    <div class="header ion-padding">
                        <ion-searchbar
                            bar
                            v-model="searchText"
                            animated="true"
                            mode="ios"
                            :placeholder="$t('common.buscar')"
                            show-clear-button="always"></ion-searchbar>
                        <ion-button @click="openModal()">
                            <ion-icon
                                slot="icon-only"
                                :icon="addOutline"></ion-icon>
                        </ion-button>
                    </div>
                    <ion-grid>
                        <ion-row>
                            <ion-col
                                size="12"
                                size-md="6"
                                size-lg="3"
                                v-for="provider in filteredRecipes"
                                :key="provider.id">
                                <ion-card class="proveidor-card">
                                    <ion-card-header class="header">
                                        <ion-card-title class="text-black">{{ provider.title }}</ion-card-title>
                                        <ion-button @click="openModal(provider)">
                                            <ion-icon slot="icon-only" :icon="pencilOutline"></ion-icon>
                                        </ion-button>
                                    </ion-card-header>
                                    <ion-card-content class="text-black">
                                        {{ provider.description }}
                                    </ion-card-content>
                                </ion-card>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
            </ion-content>
        </ion-page>
        <ion-modal v-if="showModal" :is-open="showModal" :initial-breakpoint="1" :breakpoints="[0, 1]" @willDismiss="showModal = false">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title color="white">{{ currentProvider.title }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="showModal = false">
                            <ion-icon slot="icon-only" :icon="close"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div>
                    <ion-item>
                        <ion-input
                            v-model="currentProvider.title"
                            :label="$t('common.titulo')"
                            label-placement="floating"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            v-model="currentProvider.company_identifier"
                            :label="$t('common.company_identifier')"
                            label-placement="floating"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            v-model="currentProvider.address"
                            :label="$t('common.address')"
                            label-placement="floating"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            v-model="currentProvider.phone"
                            type="tel"
                            placeholder="xxx xxx xxx"
                            :label="$t('common.phone')"
                            label-placement="floating"></ion-input>
                    </ion-item>
                    <div class="ion-padding ion-align-items-center div-productos">
                        <ion-text>{{ $t("stock.products") }}</ion-text>
                        <ion-button fill="clear" @click="addNewIngredient()">
                            <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
                        </ion-button>
                    </div>
                    <ion-grid>
                        <ion-row>
                            <ion-col
                                v-for="(product, index) in currentProvider.productes"
                                :key="index"
                                :size="currentProvider.productes.length === 1 ? '12' : '12'"
                                class="product-col">
                                <ion-item class="name">
                                    <ion-input
                                        v-model="product.name"
                                        :label="$t('common.nombre')"
                                        label-placement="floating"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input
                                        v-model="product.quantity"
                                        :label="$t('common.cantidad')"
                                        label-placement="floating"
                                        type="number"
                                        min="0"></ion-input>
                                </ion-item>
                                <ion-item class="unidad">
                                    <ion-input
                                        v-model="product.unit"
                                        :label="$t('common.unidad')"
                                        label-placement="floating"
                                        type="text"></ion-input>
                                </ion-item>
                                <ion-button
                                    class="delete-product-button"
                                    fill="clear"
                                    @click="deleteIngredient(product)">
                                    <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
            </ion-content>
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons slot="end">
                        <ion-button fill="solid" color="primary" @click="saveProvider()">{{ $t("common.guardar") }}</ion-button>
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
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonIcon,
    IonButton,
    IonButtons,
    IonFooter,
    IonModal,
    IonItem,
    IonInput,
    IonText,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { pencilOutline, addOutline, close, trashOutline } from "ionicons/icons";
import { useStore } from "vuex";

import $proveidors from "@/services/appService/proveidors.js";

const store = useStore();
const searchText = ref("");
const showModal = ref(false);
const currentProvider = ref(null);
const proveidors = ref([
    {
        id: 1,
        title: "Pastas gallo",
        description: "Pastas y arroces.",
        image: "src/assets/images/escola-pia.jpg",
        productes: [
            {
                name: "Fideos",
                quantity: 10,
                unit: "g",
            },
            {
                name: "Spaghettis",
                quantity: 150,
                unit: "kg",
            },
            {
                name: "Estrellitas",
                quantity: 400,
                unit: "g",
            },
            {
                name: "Laminas lasaña",
                quantity: 10,
                unit: "Caja/5",
            },
        ],
    },
    {
        id: 2,
        title: "Legumbres y precocinados",
        description: "Legumbres y precocinados.",
        productes: [
            {
                name: "Garbanzaos",
                quantity: 300,
                unit: "kg",
            },
            {
                name: "Lentejas",
                quantity: 300,
                unit: "kg",
            },
            {
                name: "Pasta con pesto",
                quantity: 300,
                unit: "Caja/10",
            }
        ],
    },
    {
        id: 3,
        title: "Congelados",
        description: "Congelados y otros",
        productes: [
            {
                name: "Rabas",
                quantity: 7,
                unit: "kg",
            },
            {
                name: "Merluza",
                quantity: 12,
                unit: "u",
            },
            {
                name: "Nuggets",
                quantity: 20,
                unit: "Caja/20",
            },
            {
                name: "Espinacas",
                quantity: 4,
                unit: "kg",
            },
            {
                name: "Masa Pizza",
                quantity: 12,
                unit: "u",
            },
            {
                name: "Salteado verduras",
                quantity: 0,
                unit: "g",
            }
        ],
    }
]);

const filteredRecipes = computed(() => {
    if (!searchText.value) {
        return proveidors.value;
    }
    return proveidors.value.filter((provider) =>
        provider.title.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

const userToken = computed(() => {
    return store.getters["common/userToken"];
});

const openModal = (provider = null) => {
    currentProvider.value = provider
        ? { ...provider }
        : { id: null, title: "", description: "", productes: [] };
    showModal.value = true;
};

const addNewIngredient = () => {
    const defaultIngredientExists = currentProvider.value.productes.some(
        (product) =>
            product.name === "" && product.quantity === 0 && product.unit === ""
    );
    if (!defaultIngredientExists) {
        currentProvider.value.productes.push({
            name: "",
            quantity: 0,
            unit: "",
        });
    }
};

const deleteIngredient = (productToDelete) => {
    const indexToDelete = currentProvider.value.productes.findIndex(
        (product) => product === productToDelete
    );

    if (indexToDelete !== -1) {
        currentProvider.value.productes.splice(indexToDelete, 1);
    }
};

const saveProvider = async () => {
    if (!currentProvider.value.id) {
        currentProvider.value.id = Math.max(...proveidors.value.map(p => p.id)) + 1;
        proveidors.value.push({ ...currentProvider.value });
    } else {
        const index = proveidors.value.findIndex(provider => provider.id === currentProvider.value.id);
        if (index !== -1) {
            proveidors.value[index] = { ...currentProvider.value };
        }
    }
    showModal.value = false;
};

onMounted(async () => {
    proveidors.value = await $proveidors.findAll(userToken.value);
});
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
}
ion-modal {
    --height: 80vh;
    --width: 100vh;
}
ion-title {
    color: white;
}
.content {
    display: flex;
    flex-direction: column;
}
.product-col {
    display: flex;
    position: relative;
}
.name {
    width: -webkit-fill-available;
}
.div-productos {
    display: flex;
}
.proveidor-card {
    border: 1px solid var(--ion-color-primary);
    background-size: cover;
}
.text-black {
    color: black;
}

.background-div {
    width: 100px;
    height: 100px;
}
</style>
