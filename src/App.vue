<template>
    <ion-app>
        <ion-menu content-id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Menu Content</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item
                    v-for="route in routes"
                    lines="none"
                    color="black"
                    :key="route.path"
                    @click="navigate(route.path)"
                >
                    <ion-icon :icon="route.meta.icon" slot="start"></ion-icon>
                    <ion-label>{{ route.meta.title }}</ion-label>
                </ion-item>
            </ion-content>
        </ion-menu>
        <ion-page id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-title>Menu</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-router-outlet id="main-content"  :key="$route.fullPath" /> 
          </ion-page>
        </ion-app>
</template>

<script setup>
import {
    IonApp,
    IonContent,
    IonHeader,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonMenuButton,
    IonButtons,
    IonPage
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { home,restaurantOutline,personAddOutline, gridOutline } from "ionicons/icons";

const router = useRouter();

// Define the routes and their metadata
const routes = [
    {
        path: "/login",
        meta: { title: "Login", icon: home },
    },
    {
        path: "/register",
        meta: { title: "Register", icon: personAddOutline },
    },
    {
        path: "/receptes",
        meta: { title: "Receptes", icon: restaurantOutline },
    },
    {
        path: "/menus",
        meta: { title: "Menus", icon: gridOutline },
    },
    // Add more routes as needed
];

const navigate = (path) => {
    router.push(path);
};

</script>