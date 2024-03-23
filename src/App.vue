<template>
  <ion-app>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="route in routes" :key="route.path" @click="navigate(route.path)">
            <ion-icon :icon="route.meta.icon" slot="start"></ion-icon>
            <ion-label>{{ route.meta.title }}</ion-label>
          </ion-item>
        </ion-list>
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
  </ion-page>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script>
import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { home, informationCircle} from "ionicons/icons";

export default defineComponent({
  components: {
    IonApp,
    IonContent,
    IonHeader,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Define the routes and their metadata
    const routes = [
      {
        path: '/login',
        meta: { title: 'Login', icon:home }
      },
      {
        path: '/about',
        meta: { title: 'About', icon: informationCircle}
      },
      // Add more routes as needed
    ];

    const navigate = (path) => {
      router.push(path);
    };

    return { routes, currentRoute: route.path, navigate, home, informationCircle };
  },
});
</script>
