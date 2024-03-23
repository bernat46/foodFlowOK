<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Receptes</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-searchbar v-model="searchText" animated="true" mode="ios" show-clear-button="always"></ion-searchbar>
            <ion-grid>
                <ion-row>
                    <ion-col size="12" size-md="6" size-lg="3" v-for="recipe in filteredRecipes" :key="recipe.id">
                        <ion-card color="primary">
                            <img :src="recipe.image" />
                            <ion-card-header>
                                <ion-card-title class="">{{ recipe.title }}</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                {{ recipe.description }}
                            </ion-card-content>
                            <ion-button color="dark" fill="outline">Action 1</ion-button>
                            <ion-button color="dark" fill="outline">Action 2</ion-button>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
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
} from "@ionic/vue";
import { ref, computed } from "vue";

const recipes = ref([
    {
        id: 1,
        title: "Paella",
        description: "Un delicioso plato de arroz con mariscos.",
        image: "",
    },
    {
        id: 2,
        title: "Tortilla Española",
        description: "Una tortilla de patatas tradicional.",
        image: "",
    },
    {
        id: 3,
        title: "Gazpacho",
        description: "Una sopa fría de tomate refrescante.",
        image: "",
    },
]);

const searchText = ref("");

const filteredRecipes = computed(() => {
    if (!searchText.value) {
        return recipes.value;
    }
    return recipes.value.filter((recipe) => recipe.title.toLowerCase().includes(searchText.value.toLowerCase()));
});
</script>
