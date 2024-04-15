<template>
    <div>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Menu</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <template v-if="!isMobile">
                    <ion-grid class="ion-padding-top">
                        <ion-row>
                            <ion-col
                                size="11"
                                class="ion-datetime-button ion-padding-horizontal">
                                <ion-label style="font-weight: bold"
                                    >Selecciona mes y año</ion-label
                                >
                                <ion-datetime-button
                                    color="secondary"
                                    datetime="datetime"></ion-datetime-button>
                                <ion-modal
                                    :keep-contents-mounted="true"
                                    class="dateModal">
                                    <ion-datetime
                                        v-model="selectedDate"
                                        color="secondary"
                                        presentation="month-year"
                                        id="datetime"
                                        :min="minDate"
                                        :max="maxDate"></ion-datetime>
                                </ion-modal>
                            </ion-col>
                            <ion-col
                                size="1"
                                class="ion-datetime-button ion-padding-horizontal ion-justify-content-center">
                                <ion-button @click="createNewMenu()">
                                    <ion-icon
                                        slot="icon-only"
                                        :icon="addOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                    <ion-grid
                        v-if="selectedDate"
                        class="ion-padding-horizontal">
                        <ion-row class="ion-justify-content-center">
                            <ion-col size="auto">
                                <ion-text
                                    class="ion-text-capitalize ion-text-center">
                                    <h2 class="ion-no-margin">
                                        {{
                                            selectedDate
                                                ? new Date(
                                                      selectedDate
                                                  ).toLocaleDateString(
                                                      "es-ES",
                                                      {
                                                          month: "long",
                                                          year: "numeric",
                                                      }
                                                  )
                                                : ""
                                        }}
                                    </h2>
                                </ion-text>
                            </ion-col>
                        </ion-row>
                        <ion-row class="ion-nowrap">
                            <ion-col
                                v-for="dayName in labelDayNames"
                                :key="dayName"
                                class="menu-col">
                                <div class="menuDay headerDay">
                                    <strong>{{ dayName }}</strong>
                                </div>
                            </ion-col>
                        </ion-row>
                        <template
                            v-for="(row, rowIndex) in Math.ceil(
                                daysInMonth.length / 7
                            )"
                            :key="rowIndex">
                            <ion-row>
                                <template
                                    v-for="(day, dayIndex) in 7"
                                    :key="dayIndex">
                                    <ion-col class="menu-col">
                                        <div
                                            :class="{
                                                clickable: dayIndex < 5,
                                                menuDay:
                                                    daysInMonth[
                                                        rowIndex * 7 + dayIndex
                                                    ].dayOfMonth !== '',
                                                hiddenDay:
                                                    daysInMonth[
                                                        rowIndex * 7 + dayIndex
                                                    ].dayOfMonth === '',
                                            }"
                                            @click="
                                                dayIndex < 5
                                                    ? openModal(
                                                          daysInMonth[
                                                              rowIndex * 7 +
                                                                  dayIndex
                                                          ]
                                                      )
                                                    : null
                                            ">
                                            <strong>{{
                                                daysInMonth[
                                                    rowIndex * 7 + dayIndex
                                                ].dayOfMonth
                                            }}</strong>
                                            <div
                                                v-for="(
                                                    idDish, mealIndex
                                                ) in daysInMonth[
                                                    rowIndex * 7 + dayIndex
                                                ].meals.dishes"
                                                :key="mealIndex">
                                                <div>
                                                    {{ getPlat(idDish).name }}
                                                </div>
                                            </div>
                                        </div>
                                    </ion-col>
                                </template>
                            </ion-row>
                        </template>
                    </ion-grid>
                </template>
                <div v-else class="div-mobile">
                    <div class="datetime-mobile ion-padding-vertical">
                        <ion-datetime
                            v-model="selectedDate"
                            presentation="date"
                            class="mobile-datetime"
                            :min="minDate"
                            :max="maxDate"
                            @ionChange="
                                updateSelectedDate($event)
                            "></ion-datetime>
                        <ion-button
                            @click="createNewMenu()"
                            class="newMenuButtonMobile">
                            <ion-icon
                                slot="icon-only"
                                :icon="addOutline"></ion-icon>
                        </ion-button>
                    </div>
                    <ion-list
                        class="days-menu-list"
                        lines="inset"
                        ref="ionListMenuDays">
                        <div v-for="(day, index) in daysInMonth" :key="index">
                            <div v-if="day.dayOfMonth !== ''">
                                <ion-item
                                    :ref="
                                        (el) =>
                                            (daysMonthRef[day.dayOfMonth] = el)
                                    ">
                                    <ion-label class="day-mobile-label"
                                        >{{ day.dayOfMonth }}
                                        {{
                                            $t(
                                                `common.mesos.${obtenerMes(
                                                    selectedDate
                                                )}`
                                            )
                                        }}
                                        {{ selectedDate.split("-")[0] }}
                                        <ion-button
                                            class="save-button"
                                            color="primary"
                                            fill="solid"
                                            @click="openModal(day)">
                                            Editar
                                        </ion-button>
                                    </ion-label>
                                </ion-item>
                                <ion-item
                                    v-for="(dish, dishIndex) in day.meals
                                        .dishes"
                                    :key="dishIndex"
                                    class="item-dish">
                                    <ion-label style="width: fit-content"
                                        >{{ getPlat(dish).name }}
                                        <span
                                            style="
                                                font-size: 13px;
                                                color: var(
                                                    --ion-color-secondary
                                                );
                                            "
                                            class="ion-text-capitalize"
                                            >{{
                                                getTypeString(
                                                    getPlat(dish).type
                                                )
                                            }}</span
                                        ></ion-label
                                    >
                                    <div class="icon-group">
                                        <div
                                            v-for="(allergen, index) in getPlat(
                                                dish
                                            ).allergens"
                                            :key="index"
                                            class="circle circle-mobile"
                                            :class="allergen.toLowerCase()">
                                            <ion-icon
                                                size="medium"
                                                :src="
                                                    '/allergies/' +
                                                    allergen.toLowerCase() +
                                                    '.svg'
                                                "
                                                alt="allergen"></ion-icon>
                                        </div>
                                    </div>
                                </ion-item>
                            </div>
                        </div>
                    </ion-list>
                </div>
            </ion-content>
        </ion-page>
        <ion-modal
            v-if="showModal"
            :is-open="showModal"
            :backdrop-dismiss="false"
            :initial-breakpoint="1"
            :breakpoints="[0, 1]"
            class="selectDish">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title style="color: white" class="ion-text-capitalize"
                        >{{ selectedDay.dayOfMonth }} -
                        {{
                            selectedDate
                                ? new Date(selectedDate).toLocaleDateString(
                                      "es-ES",
                                      {
                                          month: "long",
                                          year: "numeric",
                                      }
                                  )
                                : ""
                        }}</ion-title
                    >
                    <ion-buttons slot="end">
                        <ion-button
                            @click="
                                showModal = false;
                                selectedDay = null;
                            ">
                            <ion-icon slot="icon-only" :icon="close"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div class="select-day-cards ion-padding">
                    <ion-card @click="openPopover(0)" id="firstOpenPopover">
                        <ion-card-content v-if="selectedDay">
                            <div
                                v-if="selectedFirstDish.name == null"
                                class="card-label">
                                <label>Selecciona el primer</label>
                            </div>
                            <template v-else>
                                <div class="select-dish-class">
                                    <h2 class="ion-padding-horizontal">
                                        {{ selectedFirstDish.name }}
                                        <span>
                                            {{
                                                getTypeString(
                                                    selectedFirstDish.type
                                                )
                                            }}</span
                                        >
                                    </h2>
                                    <div class="ion-padding">
                                        <h3 class="ion-padding-bottom">
                                            Ingredients:
                                        </h3>
                                        <div>
                                            <ion-chip
                                                v-for="(
                                                    ingredient, index
                                                ) in selectedFirstDish.ingredients"
                                                size="small"
                                                :key="index">
                                                {{ ingredient }}
                                            </ion-chip>
                                        </div>
                                    </div>
                                    <div class="ion-padding">
                                        <div
                                            v-if="
                                                selectedFirstDish.allergens
                                                    .length > 0
                                            "
                                            class="icon-group">
                                            <div
                                                v-for="(
                                                    allergen, index
                                                ) in selectedFirstDish.allergens"
                                                :key="index"
                                                class="circle"
                                                :class="allergen.toLowerCase()">
                                                <ion-icon
                                                    size="large"
                                                    :src="
                                                        '/allergies/' +
                                                        allergen.toLowerCase() +
                                                        '.svg'
                                                    "
                                                    alt="allergen"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ion-card-content>
                    </ion-card>
                    <ion-card @click="openPopover(1)">
                        <ion-card-content v-if="selectedDay">
                            <div
                                v-if="selectedSecondDish.name == null"
                                class="card-label">
                                <label>Selecciona el segundo</label>
                            </div>
                            <template v-else>
                                <div class="select-dish-class">
                                    <h2 class="ion-padding-horizontal">
                                        {{ selectedSecondDish.name }}
                                        <span>{{
                                            getTypeString(
                                                selectedSecondDish.type
                                            )
                                        }}</span>
                                    </h2>
                                    <div class="ion-padding">
                                        <h3 class="ion-padding-bottom">
                                            Ingredients:
                                        </h3>
                                        <div>
                                            <ion-chip
                                                v-for="(
                                                    ingredient, index
                                                ) in selectedSecondDish.ingredients"
                                                size="small"
                                                :key="index">
                                                {{ ingredient }}
                                            </ion-chip>
                                        </div>
                                    </div>
                                    <div class="ion-padding">
                                        <div
                                            v-if="
                                                selectedSecondDish.allergens
                                                    .length > 0
                                            "
                                            class="icon-group">
                                            <div
                                                v-for="(
                                                    allergen, index
                                                ) in selectedSecondDish.allergens"
                                                :key="index"
                                                class="circle"
                                                :class="allergen.toLowerCase()">
                                                <ion-icon
                                                    size="large"
                                                    :src="
                                                        '/allergies/' +
                                                        allergen.toLowerCase() +
                                                        '.svg'
                                                    "
                                                    alt="allergen"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ion-card-content>
                    </ion-card>

                    <ion-card @click="openPopover(2)">
                        <ion-card-content v-if="selectedDay">
                            <div
                                v-if="selectedDessertDish.name == null"
                                class="card-label">
                                <label>Selecciona el postre </label>
                            </div>
                            <template v-else>
                                <div class="select-dish-class">
                                    <h2 class="ion-padding-horizontal">
                                        {{ selectedDessertDish.name }}
                                        <span>{{
                                            getTypeString(
                                                selectedDessertDish.type
                                            )
                                        }}</span>
                                    </h2>
                                    <div class="ion-padding">
                                        <h3 class="ion-padding-bottom">
                                            Ingredients:
                                        </h3>
                                        <div>
                                            <ion-chip
                                                v-for="(
                                                    ingredient, index
                                                ) in selectedDessertDish.ingredients"
                                                size="small"
                                                :key="index">
                                                {{ ingredient }}
                                            </ion-chip>
                                        </div>
                                    </div>

                                    <div class="ion-padding">
                                        <div
                                            v-if="
                                                selectedDessertDish.allergens
                                                    .length > 0
                                            "
                                            class="icon-group">
                                            <div
                                                v-for="(
                                                    allergen, index
                                                ) in selectedDessertDish.allergens"
                                                :key="index"
                                                class="circle"
                                                :class="allergen.toLowerCase()">
                                                <ion-icon
                                                    size="large"
                                                    :src="
                                                        '/allergies/' +
                                                        allergen.toLowerCase() +
                                                        '.svg'
                                                    "
                                                    alt="allergen"></ion-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ion-card-content>
                    </ion-card>
                </div>
            </ion-content>
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons slot="end"
                        ><ion-button
                            class="save-button"
                            color="primary"
                            fill="solid"
                            @click="
                                saveMenuDay(
                                    selectedFirstDish,
                                    selectedSecondDish,
                                    selectedDessertDish
                                )
                            ">
                            <ion-icon color slot="end" :icon="save"></ion-icon>
                            Guardar
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-footer>
        </ion-modal>
        <ion-popover
            :is-open="showPopover"
            @didDismiss="showPopover = false"
            side="center"
            alignment="center"
            reference="event"
            size="auto">
            <ion-searchbar v-model="searchText" color="primary"></ion-searchbar>
            <ion-list>
                <ion-item
                    v-for="plat in filteredPlats"
                    :key="plat.id"
                    @click="selectPlat(plat)">
                    <ion-label
                        >{{ plat.name }} |
                        <span
                            style="
                                font-size: 13px;
                                color: var(--ion-color-secondary);
                            "
                            class="ion-text-capitalize"
                            >{{ getTypeString(plat.type) }}</span
                        ></ion-label
                    >
                </ion-item>
            </ion-list>
        </ion-popover>
    </div>
</template>

<script setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonRow,
    IonGrid,
    IonCol,
    IonModal,
    IonLabel,
    IonDatetimeButton,
    IonIcon,
    IonButton,
    IonText,
    IonButtons,
    IonCardContent,
    IonCard,
    IonFooter,
    IonPopover,
    IonItem,
    IonList,
    IonSearchbar,
    IonChip,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { addOutline, close, save } from "ionicons/icons";

const currentDate = new Date();
const currentYearMonth = ref("");
const selectedDate = ref(
    currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1).toString().padStart(2, "0")
);
const showModal = ref(false);
const showPopover = ref(false);
const newMonthMenu = ref(null);
const selectedDay = ref(null);
const daysMonthRef = ref({});
const ionListMenuDays = ref(null);
const selectedFirstDish = ref({
    id: null,
    type: null,
    name: null,
    allergens: [],
    ingredients: [],
});
const selectedSecondDish = ref({
    id: null,
    type: null,
    name: null,
    allergens: [],
    ingredients: [],
});
const selectedDessertDish = ref({
    id: null,
    type: null,
    name: null,
    allergens: [],
    ingredients: [],
});

const selectedPlat = ref(null);
const searchText = ref("");

const tipoPlato = ref(null);

const isMobile = ref(window.innerWidth <= 576); // Establece el valor inicial basado en el ancho de la ventana

// Días de la semana en orden
const labelDayNames = [
    "Dilluns",
    "Dimarts",
    "Dimecres",
    "Dijous",
    "Divendres",
    "Dissabte",
    "Diumenge",
];

// 1 carbohidrat,0 proteina,2 postre
const plats = ref([
    {
        id: 1,
        type: 0,
        name: "Ensalada de remolacha",
        allergens: [],
        ingredients: [
            "Remolacha",
            "Lechuga",
            "Tomate",
            "Zanahoria",
            "Vinagre",
            "Aceite de oliva",
        ],
    },
    {
        id: 2,
        type: 1,
        name: "Pasta al pesto",
        allergens: ["fsecos"],
        ingredients: [
            "Pasta",
            "Pesto",
            "Piñones",
            "Albahaca",
            "Ajo",
            "Queso parmesano",
            "Aceite de oliva",
        ],
    },
    {
        id: 3,
        type: 2,
        name: "Yogur con miel",
        allergens: [],
        ingredients: ["Yogur", "Miel"],
    },
    {
        id: 4,
        type: 1,
        name: "Sopa de cebolla",
        allergens: [],
        ingredients: [
            "Cebolla",
            "Caldo de verduras",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
            "Queso gruyere",
        ],
    },
    {
        id: 5,
        type: 0,
        name: "Ternera estofada",
        allergens: [],
        ingredients: [
            "Ternera",
            "Cebolla",
            "Zanahoria",
            "Patata",
            "Caldo de carne",
            "Vino tinto",
            "Harina",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 6,
        type: 2,
        name: "Pastel de zanahoria",
        allergens: ["fsecos"],
        ingredients: [
            "Zanahoria",
            "Harina",
            "Azúcar",
            "Aceite de girasol",
            "Nuez moscada",
            "Canela",
            "huevo",
            "Levadura",
            "Queso crema",
            "Mantequilla",
        ],
    },
    {
        id: 7,
        type: 0,
        name: "Ensalada de tomate y mozzarella",
        allergens: ["lacteos"],
        ingredients: [
            "Tomate",
            "Mozzarella",
            "Albahaca",
            "Aceite de oliva",
            "Vinagre balsámico",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 8,
        type: 1,
        name: "Arroz tres delicias",
        allergens: [],
        ingredients: [
            "Arroz",
            "Gambas",
            "Jamón",
            "Guisantes",
            "Huevo",
            "Cebolla",
            "Aceite de oliva",
            "Sal",
        ],
    },
    {
        id: 9,
        type: 2,
        name: "Fruta fresca",
        allergens: [],
        ingredients: ["Plátano", "Manzana", "Naranja", "Fresa", "Pera", "Kiwi"],
    },
    {
        id: 10,
        type: 1,
        name: "Gazpacho",
        allergens: ["pescado"],
        ingredients: [
            "Tomate",
            "Pimiento",
            "Pepino",
            "Cebolla",
            "Ajo",
            "Vinagre",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 11,
        type: 1,
        name: "Lasaña vegetal",
        allergens: ["lacteos", "gluten"],
        ingredients: [
            "Láminas de lasaña",
            "Berenjena",
            "Calabacín",
            "Pimiento rojo",
            "Pimiento verde",
            "Cebolla",
            "Tomate frito",
            "Queso mozzarella",
            "Queso parmesano",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
            "Orégano",
        ],
    },
    {
        id: 12,
        type: 2,
        name: "Flan de huevo",
        allergens: ["huevo", "lacteos"],
        ingredients: ["Leche", "huevo", "Azúcar", "Vainilla"],
    },
    {
        id: 13,
        type: 0,
        name: "Ensalada Waldorf",
        allergens: ["fsecos"],
        ingredients: [
            "Manzana",
            "Apio",
            "Nueces",
            "Uvas pasas",
            "Lechuga",
            "Mayonesa",
            "Zumo de limón",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 14,
        type: 0,
        name: "Pollo al curry con arroz",
        allergens: [],
        ingredients: [
            "Pollo",
            "Cebolla",
            "Pimiento",
            "Ajo",
            "Jengibre",
            "Curry",
            "Leche de coco",
            "Tomate triturado",
            "Arroz",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 15,
        type: 2,
        name: "Gelatina de frutas",
        allergens: [],
        ingredients: ["Gelatina de frutas", "Frutas frescas"],
    },
    {
        id: 16,
        type: 1,
        name: "Sopa de lentejas",
        allergens: [],
        ingredients: [
            "Lentejas",
            "Cebolla",
            "Zanahoria",
            "Apio",
            "Patata",
            "Tomate",
            "Caldo de verduras",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
            "Pimentón dulce",
        ],
    },
    {
        id: 17,
        type: 0,
        name: "Bistec a la parrilla",
        allergens: [],
        ingredients: ["Bistec", "Aceite de oliva", "Sal", "Pimienta"],
    },
    {
        id: 18,
        type: 2,
        name: "Tarta de manzana",
        allergens: ["gluten", "lacteos"],
        ingredients: [
            "Masa quebrada",
            "Manzana",
            "Azúcar",
            "Canela",
            "Mantequilla",
            "Harina",
            "Huevo",
        ],
    },
    {
        id: 19,
        type: 1,
        name: "Sopa de marisco",
        allergens: ["Mariscos"],
        ingredients: [
            "Gambas",
            "Almejas",
            "Mejillones",
            "Caldo de pescado",
            "Tomate",
            "Cebolla",
            "Pimiento verde",
            "Pimiento rojo",
            "Ajo",
            "Aceite de oliva",
            "Brandy",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 20,
        type: 0,
        name: "Filete de merluza en salsa verde",
        allergens: [],
        ingredients: [
            "Filete de merluza",
            "Harina",
            "Aceite de oliva",
            "Ajo",
            "Perejil",
            "Vino blanco",
            "Caldo de pescado",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 21,
        type: 2,
        name: "Helado de vainilla",
        allergens: ["lacteos"],
        ingredients: ["Leche", "Nata", "Azúcar", "Yema de huevo", "Vainilla"],
    },
    {
        id: 22,
        type: 1,
        name: "Ensalada de garbanzos",
        allergens: [],
        ingredients: [
            "Garbanzos",
            "Tomate",
            "Pimiento verde",
            "Cebolla",
            "Aceite de oliva",
            "Vinagre",
            "Sal",
            "Pimienta",
            "Comino",
        ],
    },
    {
        id: 23,
        type: 1,
        name: "Arroz negro",
        allergens: [
            "carne",
            "fsecos",
            "gluten",
            "huevo",
            "lacteos",
            "marisco",
            "pescado",
        ],
        ingredients: [
            "Arroz",
            "Sepia",
            "Calamar",
            "Pimiento rojo",
            "Tomate",
            "Ajo",
            "Caldo de pescado",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
            "Pimentón dulce",
        ],
    },
    {
        id: 24,
        type: 2,
        name: "Fruta del tiempo",
        allergens: [],
        ingredients: ["Frutas variadas"],
    },
    {
        id: 25,
        type: 1,
        name: "Pizza vegetal",
        allergens: ["gluten", "lacteos"],
        ingredients: [
            "Masa de pizza",
            "Tomate frito",
            "Mozzarella",
            "Berenjena",
            "Calabacín",
            "Pimiento rojo",
            "Pimiento verde",
            "Champiñones",
            "Aceitunas",
            "Aceite de oliva",
            "Orégano",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 26,
        type: 2,
        name: "Tiramisú",
        allergens: ["huevo", "lacteos"],
        ingredients: [
            "Café",
            "Licor de café",
            "Bizcochos de soletilla",
            "huevo",
            "Azúcar",
            "Queso mascarpone",
            "Cacao en polvo",
        ],
    },
    {
        id: 27,
        type: 1,
        name: "Ensalada de pasta",
        allergens: ["gluten"],
        ingredients: [
            "Pasta corta",
            "Tomate cherry",
            "Aceitunas",
            "Queso feta",
            "Albahaca",
            "Aceite de oliva",
            "Vinagre balsámico",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 28,
        type: 0,
        name: "Pechuga de pollo empanizada",
        allergens: ["gluten"],
        ingredients: [
            "Pechuga de pollo",
            "Harina",
            "Huevo",
            "Pan rallado",
            "Aceite de oliva",
            "Sal",
            "Pimienta",
        ],
    },
    {
        id: 29,
        type: 2,
        name: "Gelatina de limón",
        allergens: [],
        ingredients: ["Gelatina de limón"],
    },
]);

const menus = ref([
    {
        // Març
        id: 1,
        date: "2024-03",
        meals: [
            { id: 1, dishes: [1, 5, 6] },
            { id: 2, dishes: [7, 8, 9] },
            { id: 3, dishes: [10, 11, 12] },
            { id: 4, dishes: [10, 11, 12] },
            { id: 5, dishes: [10, 11, 12] },
            { id: 6, dishes: [10, 11, 12] },
            { id: 7, dishes: [10, 11, 12] },
            { id: 8, dishes: [10, 11, 12] },
            { id: 9, dishes: [10, 11, 12] },
            { id: 10, dishes: [10, 11, 12] },
            { id: 11, dishes: [10, 11, 12] },
            { id: 12, dishes: [10, 11, 12] },
            { id: 13, dishes: [10, 11, 12] },
            { id: 14, dishes: [10, 11, 12] },
            { id: 15, dishes: [10, 11, 12] },
            { id: 16, dishes: [10, 11, 12] },
            { id: 17, dishes: [7, 8, 9] },
            { id: 18, dishes: [10, 11, 12] },
            { id: 19, dishes: [13, 14, 15] },
            { id: 20, dishes: [16, 17, 18] },
            { id: 21, dishes: [16, 17, 18] },
        ],
    },
    {
        // Abril
        id: 2,
        date: "2024-04",
        meals: [
            { id: 1, dishes: [22, 2, 3] },
            { id: 2, dishes: [19, 20, 21] },
            { id: 3, dishes: [23, 24, 25] },
            { id: 4, dishes: [10, 11, 12] },
            { id: 5, dishes: [10, 11, 12] },
            { id: 6, dishes: [10, 11, 12] },
            { id: 7, dishes: [10, 11, 12] },
            { id: 8, dishes: [10, 11, 12] },
            { id: 9, dishes: [10, 11, 12] },
            { id: 10, dishes: [10, 26, 27] },
            { id: 11, dishes: [10, 11, 12] },
            { id: 12, dishes: [10, 11, 12] },
            { id: 13, dishes: [10, 11, 12] },
            { id: 14, dishes: [10, 11, 12] },
            { id: 15, dishes: [10, 11, 12] },
            { id: 16, dishes: [10, 11, 12] },
            { id: 17, dishes: [7, 8, 9] },
            { id: 18, dishes: [10, 11, 12] },
            { id: 19, dishes: [13, 14, 15] },
            { id: 20, dishes: [16, 17, 18] },
            { id: 21, dishes: [16, 17, 18] },
            { id: 22, dishes: [16, 17, 18] },
        ],
    },
]);

const getCurrentYearMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    return `${year}-${month}`;
};
const getNextMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    return `${year}-${month}`;
};

const minDate = computed(() => {
    let min = menus.value.reduce(
        (min, menu) => (menu.date < min ? menu.date : min),
        menus.value[0].date
    );
    const [year, month] = min.split("-");
    const monthPadded = month.padStart(2, "0"); // Afegeix un zero al davant si el mes és menor que 10
    min = `${year}-${monthPadded}-01T00:00:00`; // Canviem l'ordre de l'any i el mes, i afegim el dia i l'hora
    return min;
});

const maxDate = computed(() => {
    let max = menus.value.reduce(
        (max, menu) => (menu.date > max ? menu.date : max),
        menus.value[0].date
    );
    const [year, month] = max.split("-");
    const lastDayOfMonth = new Date(year, month, 0).getDate(); // Obtiene el último día del mes
    const monthPadded = month.padStart(2, "0"); // Añade un cero al principio si el mes es menor que 10
    max = `${year}-${monthPadded}-${lastDayOfMonth}T23:59:59`; // Cambia el orden del año y el mes, y añade el día y la hora
    return max;
});

const daysInMonth = computed(() => {
    if (!selectedDate.value) return [];

    const date = new Date(selectedDate.value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Ajustamos para que la semana comience en lunes
    const lastDayOfMonth =
        (new Date(year, month, daysInMonth).getDay() + 6) % 7; // Ajustamos para que la semana comience en lunes

    const paddedMonth = (month + 1).toString().padStart(2, "0"); // Afegeix un zero al davant si el mes és menor que 10
    const menuForMonth = menus.value.find(
        (menu) => menu.date === `${year}-${paddedMonth}`
    );
    const meals = menuForMonth ? menuForMonth.meals : [];

    let mealIndex = 0;

    const days = Array.from({ length: daysInMonth }, (_, index) => {
        const dayOfMonth = index + 1;
        const dayOfWeek = (firstDayOfMonth + index) % 7;

        let mealsForDay;

        // Evitar asignar comidas para sábado y domingo
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            mealsForDay = [];
        } else {
            const meal = meals[mealIndex];
            mealsForDay = meal
                ? { id: meal.id, dishes: meal.dishes }
                : { id: null, dishes: [] };
            mealIndex++; // Incrementem l'índex dels àpats només per als dies laborables
        }

        return {
            dayOfMonth,
            meals: mealsForDay,
        };
    });

    // Omplir enrere els dies buits
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.unshift({
            dayOfMonth: "",
            meals: [],
        });
    }

    // Omplir endavant els dies buits
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
        days.push({
            dayOfMonth: "",
            meals: [],
        });
    }

    // Si l'últim dia és dilluns, afegim 6 dies més per completar la setmana
    if (lastDayOfMonth === 0) {
        for (let i = 0; i < 6; i++) {
            days.push({
                dayOfMonth: "",
                meals: [],
            });
        }
    }

    return days;
});

const createNewMenu = () => {
    const newMonthCreated = getNextMonth();
    selectedDate.value = newMonthCreated;
    currentYearMonth.value = newMonthCreated;

    // Crear un nuevo menú con todos los días llenos de platos con valor '-'
    const emptyMenu = daysInMonth.value.map(() => {
        return {
            id: null, // Asignar una nueva id a cada día
            dishes: ["-", "-", "-"], // Llenar cada día con tres platos con valor '-'
        };
    });

    // Crear un nuevo objeto de menú
    const newMenu = {
        id: menus.value.length + 1, // Asignar una nueva id al menú
        date: newMonthCreated, // Asignar la fecha del mes siguiente
        meals: emptyMenu, // Asignar el menú vacío
    };

    // Añadir el nuevo menú al array de menús
    menus.value.push(newMenu);

    // Establecer el nuevo menú vacío en newMonthMenu
    newMonthMenu.value = emptyMenu;
};

// Función para obtener el nombre de un plato dado su ID
function getPlat(id) {
    const plat = plats.value.find((plat) => plat.id === id);
    return plat ? plat : "Selecciona un plat";
}

function openModal(day) {
    selectedDay.value = day;
    showModal.value = true;
    if (day.meals && day.meals.dishes.length > 0) {
        selectedFirstDish.value = getPlat(day.meals.dishes[0]);
        selectedSecondDish.value = getPlat(day.meals.dishes[1]);
        selectedDessertDish.value = getPlat(day.meals.dishes[2]);
    }
}
function openPopover(dishType) {
    tipoPlato.value = dishType;
    showPopover.value = true;
}

function saveMenuDay(firstDish, secondDish, thirdDish) {
    console.log(firstDish, secondDish, thirdDish);
    showModal.value = false;
}
function updateSelectedDate(event) {
    const date = new Date(event.detail.value);
    const day =
        date.getDate() < 10 ? date.getDate() : ("0" + date.getDate()).slice(-2);
    selectedDate.value =
        date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
    daysMonthRef.value[day].$el.scrollIntoView();
}

function obtenerMes(selectedDate) {
    const partes = selectedDate.split("-");
    const mes = parseInt(partes[1], 10);
    return mes;
}

const selectPlat = (plat) => {
    selectedPlat.value = plat;
    showPopover.value = false;

    if (selectedDay.value) {
        if (!selectedDay.value.meals.dishes) {
            selectedDay.value.meals.dishes = {};
        }
        switch (tipoPlato.value) {
            case 0:
                selectedDay.value.meals.dishes[0] = plat.id;
                selectedFirstDish.value = plat;
                break;
            case 1:
                selectedDay.value.meals.dishes[1] = plat.id;
                selectedSecondDish.value = plat;
                break;
            case 2:
                selectedDay.value.meals.dishes[2] = plat.id;
                selectedDessertDish.value = plat;
                break;
            default:
                break;
        }
    }
};

const filteredPlats = computed(() => {
    return plats.value.filter((plat) => {
        const nameMatches = searchText.value
            ? plat.name.toLowerCase().includes(searchText.value.toLowerCase())
            : true;
        let typeMatches = true;
        if (tipoPlato.value === 0 || tipoPlato.value === 1) {
            typeMatches = plat.type !== 2;
        } else if (tipoPlato.value === 2) {
            typeMatches = plat.type !== 0 && plat.type !== 1;
        }
        return nameMatches && typeMatches;
    });
});

const getTypeString = (type) => {
    switch (type) {
        case 0:
            return "proteina";
        case 1:
            return "carbohidrat";
        case 2:
            return "postre";
        default:
            return "desconocido";
    }
};

onMounted(() => {
    currentYearMonth.value = getCurrentYearMonth();

    if(isMobile.value){
        const options = {
            root: ionListMenuDays.value.$el,
            rootMargin: "-20px 0px -100% 0px",
            threshold: 0,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const selectedDay = entry.target.innerText;
                    console.log("Selected Day:", selectedDay);
                    const dia = selectedDay.split(" ")[0];
                    const diaFormateado = dia < 10 ? "0" + dia : dia;
                    // if (selectedDate.value.length !== 7) {
                    //     // selectedDate.value no tiene el formato YYYY-MM-DD
                    //     selectedDate.value = `${selectedDate.value}-${diaFormateado}`; // Agrega el día a selectedDate.value
                    // } else {
                    // selectedDate.value ya tiene el formato YYYY-MM-DD
                    const parts = selectedDate.value.split("-"); // Divide la fecha en partes
                    parts[2] = diaFormateado; // Actualiza el día
                    const fechaFormateada = parts.join("-"); // Une las partes nuevamente
                    console.log("Selected Date:", fechaFormateada);
                    selectedDate.value = fechaFormateada; // Actualiza selectedDate.value
                    // }
                }
            });
        }, options);
    
        Object.values(daysMonthRef.value).forEach((item) => {
            observer.observe(item.$el);
        });
        
    }
});
</script>

<style lang="scss" scoped>
ion-datetime {
    --background: #ffffff;
    --border-radius: 16px;
}
.ion-datetime-button {
    display: flex;
    align-items: center;
}
.ion-datetime-button ion-label {
    margin-right: 8px;
}

.menuDay,
.hiddenDay {
    margin-top: 10px;
    border: 1px solid var(--ion-color-primary);
    border-radius: 8px;
    padding: 8px;
    max-width: 250px;
    height: 100%;
}

.menuDay strong {
    font-weight: bold;
    font-size: 16px;
}

.menuDay > div {
    margin-top: 8px;
}
.clickable {
    cursor: pointer;
    min-height: 120px;
}
.hiddenDay {
    visibility: hidden;
}
ion-datetime-button::part(native) {
    background-color: var(--ion-color-secondary);
    color: black;
}
.headerDay {
    display: flex;
    align-items: center;
}
.select-day-cards {
    height: 100%;
    overflow: hidden;
    display: flex;

    ion-card {
        width: 100%;
        border: 1px solid var(--ion-color-primary);
    }
}
ion-popover {
    position: absolute;
    --width: 25vw;
    --height: 33vh;
}
ion-popover::part(content) {
    position: absolute;
    left: 35%;
}
ion-modal.selectDish {
    --height: 60vh;
    --width: 80vw;
}
ion-card-content {
    position: relative;
    height: 100%;
    overflow: auto;
    .card-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
.select-dish-class {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    span {
        font-size: 12px;
        font-weight: normal;
        color: var(--ion-color-secondary);
        margin-left: 5px;
    }
    h2 {
        color: black;
        font-weight: bold;
        font-size: 20px;
    }
    div {
        flex-grow: 1;
    }

    h3 {
        margin-top: 0;
        margin-bottom: 5px;
        color: black;
    }
}
[size="small"] {
    height: 20px;
    font-size: 12px;
    margin: 2px;
    text-wrap: nowrap;
}
.icon-group {
    display: flex;
    column-gap: 5px;
    .circle {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        flex-grow: 0 !important;
        justify-content: center;
        align-items: center;
    }
    .circle-mobile {
        width: 30px;
        height: 30px;
        ion-icon {
            font-size: 20px;
        }
    }
}
.datetime-mobile {
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: var(--background);
}
.days-menu-list {
    overflow: auto;
    overflow-anchor: auto;
    height: 52.6vh;
    padding: 0;
}
.day-mobile-label {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    column-gap: 15px;
}

ion-datetime {
    --background: #e0e0e0;
    --color: black;

    border-radius: 16px;
}
ion-datetime::part(calendar-day) {
    color: #000000;
}
ion-datetime::part(calendar-day):focus {
    background-color: var(--ion-color-primary);
    box-shadow: 0px 0px 0px 4px rgb(154 209 98 / 0.2);
}
ion-datetime::part(month-year-button) {
    color: black;
}
ion-datetime::part(calendar-day active),
ion-datetime::part(calendar-day active):focus {
    background-color: var(--ion-color-secondary);
    border-color: var(--ion-color-secondary);
    color: #fff;
}

.mobile-datetime {
    border: 1px solid var(--ion-color-primary);
}

@media (max-width: 768px) {
    ion-modal.selectDish {
        --height: 100vh;
        --width: 100vw;
    }
    .select-day-cards {
        flex-direction: column;
        align-items: center;
        ion-card {
            flex-grow: 1;
        }
    }
    ion-popover {
        --width: 100vw;
        --height: 100vh;
    }
    ion-popover::part(content) {
        position: absolute;
        left: 0%;
    }
    .datetime-mobile {
        height: 42vh;
        position: relative;
    }
    .newMenuButtonMobile {
        position: absolute;
        bottom: 6px;
        right: 10px;
    }
}
</style>
