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
                                        alergeno.name
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
                        <ion-select v-model="currentAlergeno.icon_route" :placeholder="$t('allergen.select_icon')" :label="$t('allergen.allergen_icon')" interface="popover">
                            <ion-select-option
                                v-for="allergy in allergies"
                                :key="allergy.value"
                                :value="allergy.value"
                                >{{ $t("allergen."+allergy.label) }}</ion-select-option
                            >
                        </ion-select >
                        <ion-img
                            v-if="currentAlergeno.icon_route"
                            :src="currentAlergeno.icon_route"
                            alt="imagen de alergeno"
                            style="max-width: 100%" />
                    </ion-item>
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
                        <ion-button v-if="currentAlergeno.id"
                            fill="solid"
                            color="primary"
                            @click="deleteAlergeno()"
                            >{{ $t("common.eliminar") }}</ion-button
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
    IonSelect,
    IonSelectOption,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { pencilOutline, addOutline, close } from "ionicons/icons";
import { useStore } from "vuex";

import $alergen from "@/services/appService/allergen.js";

const store = useStore();
const searchText = ref("");
const showModal = ref(false);
const currentAlergeno = ref(null);
const alergenos = ref([]);
const allergies = ref([
    { value: "/allergies/carne.svg", label: "carne" },
    { value: "/allergies/frsecos.svg", label: "frsecos" },
    { value: "/allergies/gluten.svg", label: "gluten" },
    { value: "/allergies/huevo.svg", label: "huevo" },
    { value: "/allergies/lacteos.svg", label: "lacteos" },
    { value: "/allergies/marisco.svg", label: "marisco" },
    { value: "/allergies/pescado.svg", label: "pescado" },
]);

const filteredAlergenos = computed(() => {
    if (!searchText.value) {
        return alergenos.value;
    }
    return alergenos.value.filter((alergeno) =>
        alergeno.nombre.toLowerCase().includes(searchText.value.toLowerCase())
    );
});
const userToken = computed(() => {
    return store.getters["common/userToken"];
});

const openModal = (alergeno = null) => {
    currentAlergeno.value = alergeno
        ? alergeno
        : { id: null, name: "", icon_route: null };
    showModal.value = true;
};

const saveAlergeno = async () => {
    if (!currentAlergeno.value.id) {
        await $alergen.postAllergen(
            currentAlergeno.value.name,
            currentAlergeno.value.icon_route,
            userToken.value
        );
    } else {
        await $alergen.putAllergen(
            currentAlergeno.value.id,
            currentAlergeno.value.name,
            currentAlergeno.value.icon_route,
            userToken.value
        );
    }
    // Cerramos el modal
    showModal.value = false;
    alergenos.value = await $alergen.findAll(userToken.value);
};
const deleteAlergeno = async () => {
    if (currentAlergeno.value.id) {
        await $alergen.deleteAllergen(
            currentAlergeno.value.id,
            userToken.value
        );
    }
    // Cerramos el modal
    showModal.value = false;
    alergenos.value = await $alergen.findAll(userToken.value);
};

const getClassName = (iconRoute) => {
    if (!iconRoute) return;
    // Obtenemos la parte entre '/' y '.svg' de la ruta del ícono
    const className = iconRoute.split("/")[2].split(".")[0];
    return className;
};

onMounted(async () => {
    alergenos.value = await $alergen.findAll(userToken.value);
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
