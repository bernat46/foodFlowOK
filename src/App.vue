<template>
    <ion-app>
        <ion-menu content-id="main-content">
            <ion-header>
                <ion-toolbar>
                    <router-link to="/inici">
                        <img src="@/assets/images/logo.png" />
                    </router-link>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item
                    v-for="route in routes"
                    lines="none"
                    color="black"
                    :key="route.path"
                    @click="navigate(route.path)">
                    <ion-icon :icon="route.meta.icon" slot="start"></ion-icon>
                    <ion-label>{{ route.meta.title }}</ion-label>
                </ion-item>
                <language-changer :is-floating-button="true" />
            </ion-content>
        </ion-menu>
        <ion-page id="main-content">
            <ion-header v-if="showMenu">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-buttons slot="end">
                        <ion-button @click="logout()">
                            {{ $t("common.logout") }}
                        </ion-button>
                    </ion-buttons>
                    <ion-title></ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-router-outlet id="main-content" :key="$route.fullPath" />
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
    IonButton,
    IonPage,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import {
    home,
    restaurantOutline,
    gridOutline,
    locationOutline,
    peopleOutline,
    cubeOutline,
    medkitOutline,
} from "ionicons/icons";
import { computed } from "vue";
import LanguageChanger from "@/components/settings/LanguageChanger.vue";

const router = useRouter();

// Define the routes and their metadata
const routes = [
    {
        path: "/inici",
        meta: { title: "Inici", icon: home },
    },
    {
        path: "/receptes",
        meta: { title: "Receptes", icon: restaurantOutline },
    },
    {
        path: "/menus",
        meta: { title: "Menus", icon: gridOutline },
    },
    {
        path: "/centres",
        meta: { title: "Centres", icon: locationOutline },
    },
    {
        path: "/alergenos",
        meta: { title: "Alergens", icon: medkitOutline },
    },
    {
        path: "/proveidors",
        meta: { title: "Proveidors", icon: peopleOutline },
    },
    {
        path: "/stocks",
        meta: { title: "Stocks", icon: cubeOutline },
    },

    // Add more routes as needed
];

const navigate = (path) => {
    router.push(path);
};
const logout = () => {
    router.push("/login");
};

const hideMenuButton = ["/inici", "/login", "/register"]; // Define routes where menu button should be hidden
const showMenu = computed(() => {
    const currentPath = router.currentRoute.value.path;
    return !hideMenuButton.includes(currentPath);
});
</script>

<style lang="scss" scoped>
ion-toolbar {
    text-align: center;
}
ion-toolbar img {
    width: 75%;
}
</style>
