<template>
    <div>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Receptes</ion-title>
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
                            <ion-card class="proveidor-card" :style="{ backgroundImage: `linear-gradient(20deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1)), url(${provider.image})`}">
                                <ion-card-header class="header">
                                    <ion-card-title class="text-black">{{
                                        provider.title
                                    }}</ion-card-title>
                                    <ion-button @click="openModal(provider)">
                                        <ion-icon
                                            slot="icon-only"
                                            :icon="pencilOutline"></ion-icon>
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
        <ion-modal
            v-if="showModal"
            :is-open="showModal"
            :initial-breakpoint="1"
            :breakpoints="[0, 1]">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title color="white">{{
                        currentProvider.title
                    }}</ion-title>
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
                        <ion-textarea
                            v-model="currentProvider.title"
                            :label="$t('common.titulo')"
                            label-placement="floating"></ion-textarea>
                    </ion-item>
                    <ion-item>
                        <ion-textarea
                            v-model="currentProvider.description"
                            :label="$t('common.descripcion')"
                            label-placement="floating"></ion-textarea>
                    </ion-item>
                    <ion-item>
                        <ion-input v-model="currentProvider.image"
                        :label="$t('common.imagen')"
                        label-placement="floating" type="file" @change="handleFileInput($event)">
                        </ion-input>
                        <img :src="imageUrl" v-if="imageUrl" alt="Uploaded Image">
                    </ion-item>     
                    <div
                        class="ion-padding ion-align-items-center div-productos">
                        <ion-text>{{ $t("Productos") }}</ion-text>
                        <ion-button fill="clear" @click="addNewIngredient()">
                            <ion-icon
                                slot="icon-only"
                                :icon="addOutline"></ion-icon>
                        </ion-button>
                    </div>
                    <ion-grid>
                        <ion-row>
                            <ion-col
                                v-for="(
                                    product, index
                                ) in currentProvider.productes"
                                :key="index"
                                :size="
                                    currentProvider.productes.length === 1
                                        ? '12'
                                        : '12'
                                "
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
                                    <ion-icon
                                        slot="icon-only"
                                        :icon="trashOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
            </ion-content>
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons slot="end">
                        <ion-button
                            fill="solid"
                            color="primary"
                            @click="saveRecipe()"
                            >{{ $t("common.guardar") }}</ion-button
                        >
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
    IonTextarea,
    IonInput,
    IonText,
} from "@ionic/vue";
import { ref, computed } from "vue";
import { pencilOutline, addOutline, close, trashOutline } from "ionicons/icons";

import $proveidors from "@/services/appService/proveidors.js";

const searchText = ref("");
const showModal = ref(false);
const currentProvider = ref(null);
const proveidors = ref([
    {
        id: 1,
        title: "Proveïdor1",
        description: "Pastas y arroces.",
        image: "src/assets/images/escola-pia.jpg",
        productes: [
            {
                name: "Fideos",
                quantity: 300,
                unit: "g",
                
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
        ],
    },
    {
        id: 2,
        title: "Proveïdor2",
        description: "Precocinados y salsas.",
        productes: [
            {
                name: "Fideos",
                quantity: 300,
                unit: "g",
                
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
            },
        ],
    },
]);

const filteredRecipes = computed(() => {
    if (!searchText.value) {
        return proveidors.value;
    }
    return proveidors.value.filter((provider) =>
        provider.title.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

const openModal = (provider = null) => {
    currentProvider.value = provider
        ? provider
        : { id: null, title: "", description: "", productes: [] };
    showModal.value = true;
};
const addNewIngredient = () => {
    const defaultIngredientExists = currentProvider.value.productes.some(
        (product) =>
            product.name === "" &&
            product.quantity === 0 &&
            product.unit === ""
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
const saveRecipe = async() => {
    if (!currentProvider.value.id) {
        // Si la receta no tiene ID, la añadimos al array proveidors
        proveidors.value.push(currentProvider.value);
        await $proveidors.postRecipe()
    }
    // Cerramos el modal
    showModal.value = false;
};

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

.background-div{
    width: 100px;
    height: 100px;
}

</style>
