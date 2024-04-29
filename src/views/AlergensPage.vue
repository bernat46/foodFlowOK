<template>
    <div>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Alergenos</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div class="header ion-padding" style="justify-content: end">
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
                            size-lg="4"
                            v-for="alergeno in filteredAlergenos"
                            :key="alergeno.id">
                            <ion-card class="alergeno-card">
                                <ion-card-header class="header">
                                    <ion-card-title class="text-black">{{
                                        alergeno.nombre
                                    }}</ion-card-title>
                                    <ion-img
                                        :src="alergeno.icon_route"
                                        alt="imagen de alergeno"
                                        style="max-width: 100%"
                                        :class="
                                            getClassName(alergeno.icon_route)
                                        " />
                                    <ion-button @click="openModal(alergeno)">
                                        <ion-icon
                                            slot="icon-only"
                                            :icon="pencilOutline"></ion-icon>
                                    </ion-button>
                                </ion-card-header>
                                <!-- <ion-card-content class="text-black">
                    <img :src="alergeno.icon_route" alt="imagen de alergeno" style="max-width: 100%;" />
                  </ion-card-content> -->
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        </ion-page>
        <ion-modal
            :is-open="showModal"
            :initial-breakpoint="1"
            :breakpoints="[0, 1]"
            @didDismiss="showModal = false">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title color="white">{{
                        currentAlergeno.nombre
                    }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="showModal = false">
                            <ion-icon slot="icon-only" :icon="close"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div class="content">
                    <ion-item>
                        <ion-textarea
                            v-model="currentAlergeno.name"
                            :label="$t('common.nombre')"
                            label-placement="floating"></ion-textarea>
                    </ion-item>
                    <ion-item>
                        <ion-input
                            type="url"
                            label="URL"
                            accept="image/*"
                            @change="handleImageUpload($event)" />
                    </ion-item>
                    <img
                        v-if="currentAlergeno.icon_route"
                        :src="currentAlergeno.icon_route"
                        alt="imagen de alergeno"
                        style="max-width: 100%" />
                </div>
            </ion-content>
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons slot="end">
                        <ion-button
                            fill="solid"
                            color="primary"
                            @click="saveAlergeno()"
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
    IonIcon,
    IonButton,
    IonButtons,
    IonFooter,
    IonModal,
    IonItem,
    IonImg,
    IonTextarea,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { pencilOutline, addOutline, close } from "ionicons/icons";

import $alergen from "@/services/appService/allergen.js";

const searchText = ref("");
const showModal = ref(false);
const currentAlergeno = ref(null);
const alergenos = ref([
    {
        id: 1,
        nombre: "Gluten",
        icon_route: "/allergies/gluten.svg",
    },
    {
        id: 2,
        nombre: "Lactosa",
        icon_route: "/allergies/lacteos.svg",
    },
    {
        id: 3,
        nombre: "Frutos secos",
        icon_route: "/allergies/fsecos.svg",
    },
]);

const filteredAlergenos = computed(() => {
    if (!searchText.value) {
        return alergenos.value;
    }
    return alergenos.value.filter((alergeno) =>
        alergeno.nombre.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

const openModal = (alergeno = null) => {
    currentAlergeno.value = alergeno
        ? alergeno
        : { id: null, name: "", icon_route: null };
    showModal.value = true;
};

const saveAlergeno = async () => {
    if (!currentAlergeno.value.id) {
        await $alergen.postAllergen(currentAlergeno.value);
    } else {
        await $alergen.putAllergen(currentAlergeno.value);
    }
    // Cerramos el modal
    showModal.value = false;
};

const getClassName = (iconRoute) => {
    // Obtenemos la parte entre '/' y '.svg' de la ruta del ícono
    const className = iconRoute.split("/")[2].split(".")[0];
    return className;
};

onMounted(async() => {
    alergenos.value = await $alergen.findAll();
});
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
ion-modal {
    --height: 40vh;
    --width: 100vh;
}
ion-title {
    color: white;
}
.content {
    display: flex;
    flex-direction: column;
}
.alergeno-card {
    border: 1px solid var(--ion-color-primary);
}
.text-black {
    color: black;
}
ion-img {
    width: 3rem;
    border-radius: 50%;
}
</style>
await