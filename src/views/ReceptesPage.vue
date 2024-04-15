<template>
    <div>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Receptes</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
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
                            v-for="recipe in filteredRecipes"
                            :key="recipe.id">
                            <ion-card class="recepte-card">
                                <ion-card-header class="header">
                                    <ion-card-title class="text-black">{{
                                        recipe.title
                                    }}</ion-card-title>
                                    <ion-button @click="openModal(recipe)">
                                        <ion-icon
                                            slot="icon-only"
                                            :icon="pencilOutline"></ion-icon>
                                    </ion-button>
                                </ion-card-header>
                                <ion-card-content class="text-black">
                                    {{ recipe.description }}
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
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
                        currentRecipe.title
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
                            v-model="currentRecipe.title"
                            :label="$t('common.titulo')"
                            label-placement="floating"></ion-textarea>
                    </ion-item>
                    <ion-item>
                        <ion-textarea
                            v-model="currentRecipe.description"
                            :label="$t('common.descripcion')"
                            label-placement="floating"></ion-textarea>
                    </ion-item>
                    <div
                        class="ion-padding ion-align-items-center div-ingredientes">
                        <ion-text>{{ $t("recetas.ingredientes") }}</ion-text>
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
                                    ingredient, index
                                ) in currentRecipe.ingredients"
                                :key="index"
                                :size="
                                    currentRecipe.ingredients.length === 1
                                        ? '12'
                                        : '6'
                                "
                                class="ingredient-col">
                                <ion-item class="name">
                                    <ion-input
                                        v-model="ingredient.name"
                                        :label="$t('common.nombre')"
                                        label-placement="floating"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input
                                        v-model="ingredient.quantity"
                                        :label="$t('common.cantidad')"
                                        label-placement="floating"
                                        type="number"
                                        min="0"></ion-input>
                                </ion-item>
                                <ion-item class="unidad">
                                    <ion-input
                                        v-model="ingredient.unit"
                                        :label="$t('common.unidad')"
                                        label-placement="floating"
                                        type="text"></ion-input>
                                </ion-item>
                                <ion-button
                                    class="delete-ingredient-button"
                                    fill="clear"
                                    @click="deleteIngredient(ingredient)">
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

const searchText = ref("");
const showModal = ref(false);
const currentRecipe = ref(null);
const recipes = ref([
    {
        id: 1,
        title: "Paella",
        description: "Un delicioso plato de arroz con mariscos.",
        ingredients: [
            { name: "Arroz", quantity: 400, unit: "g", ratioPerPerson: "200g" },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
                ratioPerPerson: "150g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
                ratioPerPerson: "150g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
                ratioPerPerson: "150g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
                ratioPerPerson: "150g",
            },
            {
                name: "Mariscos",
                quantity: 300,
                unit: "g",
                ratioPerPerson: "150g",
            },
        ],
    },
    {
        id: 2,
        title: "Tortilla Española",
        description: "Una tortilla de patatas tradicional.",
        ingredients: [
            {
                name: "Patatas",
                quantity: 600,
                unit: "g",
                ratioPerPerson: "200g",
            },
            { name: "Huevos", quantity: 6, unit: "", ratioPerPerson: "2" }, // Assuming count for eggs
        ],
    },
    {
        id: 3,
        title: "Gazpacho",
        description: "Una sopa fría de tomate refrescante.",
        ingredients: [
            {
                name: "Tomate",
                quantity: 900,
                unit: "g",
                ratioPerPerson: "300g",
            },
            {
                name: "Pepino",
                quantity: 300,
                unit: "g",
                ratioPerPerson: "100g",
            },
        ],
    },
]);

const filteredRecipes = computed(() => {
    if (!searchText.value) {
        return recipes.value;
    }
    return recipes.value.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchText.value.toLowerCase())
    );
});

const openModal = (recipe = null) => {
    currentRecipe.value = recipe
        ? recipe
        : { id: null, title: "", description: "", ingredients: [] };
    showModal.value = true;
};
const addNewIngredient = () => {
    const defaultIngredientExists = currentRecipe.value.ingredients.some(
        (ingredient) =>
            ingredient.name === "" &&
            ingredient.quantity === 0 &&
            ingredient.unit === ""
    );
    if (!defaultIngredientExists) {
        currentRecipe.value.ingredients.push({
            name: "",
            quantity: 0,
            unit: "",
        });
    }
};

const deleteIngredient = (ingredientToDelete) => {
    const indexToDelete = currentRecipe.value.ingredients.findIndex(
        (ingredient) => ingredient === ingredientToDelete
    );

    if (indexToDelete !== -1) {
        currentRecipe.value.ingredients.splice(indexToDelete, 1);
    }
};
const saveRecipe = () => {
    if (!currentRecipe.value.id) {
        // Si la receta no tiene ID, la añadimos al array recipes
        recipes.value.push(currentRecipe.value);
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
.ingredient-col {
    display: flex;
    position: relative;
}
.name {
    width: -webkit-fill-available;
}
.div-ingredientes {
    display: flex;
}
.recepte-card {
    border: 1px solid var(--ion-color-primary);
}
.text-black {
    color: black;
}
</style>
