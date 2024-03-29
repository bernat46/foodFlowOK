<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <template v-if="!isMobile">
                <ion-grid class="ion-padding">
                    <ion-row>
                        <ion-col class="ion-datetime-button">
                            <ion-label>Selecciona mes y año</ion-label>
                            <ion-datetime-button datetime="datetime"></ion-datetime-button>
                            <ion-modal :keep-contents-mounted="true">
                                <ion-datetime
                                    v-model="selectedDate"
                                    presentation="month-year"
                                    id="datetime"
                                ></ion-datetime>
                            </ion-modal>
                        </ion-col>
                    </ion-row>
                </ion-grid>

                <ion-grid v-if="selectedDate" class="ion-padding">
                    <ion-row>
                        <ion-col size="auto">
                            <ion-label class="ion-text-capitalize">{{
                                selectedDate
                                    ? new Date(selectedDate).toLocaleDateString("es-ES", {
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : ""
                            }}</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col v-for="dayName in labelDayNames" :key="dayName" class="menu-col">
                            <div class="menuDay">
                                <strong>{{ dayName }}</strong>
                            </div>
                        </ion-col>
                    </ion-row>
                    <template v-for="(row, rowIndex) in Math.ceil(daysInMonth.length / 7)" :key="rowIndex">
                        <ion-row>
                            <template v-for="(day, dayIndex) in 7" :key="dayIndex">
                                <ion-col class="menu-col">
                                    <div :class="{ menuDay:  daysInMonth[rowIndex * 7 + dayIndex].dayOfMonth !== '', hiddenDay: daysInMonth[rowIndex * 7 + dayIndex].dayOfMonth === '' }">
                                        <strong>{{ daysInMonth[rowIndex * 7 + dayIndex].dayOfMonth }}</strong>
                                        <div
                                            v-for="(meal, mealIndex) in daysInMonth[rowIndex * 7 + dayIndex].meals"
                                            :key="mealIndex"
                                        >
                                            <div>{{ meal }}</div>
                                        </div>
                                    </div>
                                </ion-col>
                            </template>
                        </ion-row>
                    </template>
                </ion-grid>
            </template>
            <template v-else>
                <ion-datetime presentation="date"></ion-datetime>
            </template>
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
    IonDatetime,
    IonRow,
    IonGrid,
    IonCol,
    IonModal,
    IonLabel,
    IonDatetimeButton,
} from "@ionic/vue";
import { ref, computed } from "vue";

const currentDate = new Date();
const selectedDate = ref(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0'));

const isMobile = ref(window.innerWidth <= 576); // Establece el valor inicial basado en el ancho de la ventana

// Días de la semana en orden
const labelDayNames = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"];
// const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const daysInMonth = computed(() => {
    if (!selectedDate.value) return [];

    const date = new Date(selectedDate.value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Ajustem perquè la setmana comenci per dilluns
    const lastDayOfMonth = (new Date(year, month, daysInMonth).getDay() + 6) % 7; // Ajustem perquè la setmana comenci per dilluns

    const days = Array.from({ length: daysInMonth }, (_, index) => {
        const meals = generateMeals();
        return {
            dayOfMonth: index + 1,
            meals: meals,
        };
    });

    // Omplir enrere els dies buits
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.unshift({
            dayOfMonth: "",
            dayOfWeek: "",
            meals: [],
        });
    }

    // Omplir endavant els dies buits
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
        days.push({
            dayOfMonth: "",
            dayOfWeek: "",
            meals: [],
        });
    }

    // Si l'últim dia és dilluns, afegim 6 dies més per completar la setmana
    if (lastDayOfMonth === 0) {
        for (let i = 0; i < 6; i++) {
            days.push({
                dayOfMonth: "",
                dayOfWeek: "",
                meals: [],
            });
        }
    }

    return days;
});

// Función para generar los platos del día
function generateMeals() {
    // Platos pregenerados para cada día
    const meals = [
        ["Ensalada mixta", "Pasta carbonara", "Tarta de manzana"],
        ["Sopa de verduras", "Pollo asado con patatas", "Helado de vainilla"],
        ["Crema de champiñones", "Filete de salmón a la plancha", "Fruta fresca"],
        ["Gazpacho", "Tortilla española", "Yogur natural con miel"],
        ["Ceviche de pescado", "Lasaña de carne", "Flan casero"],
        ["Sopa de tomate", "Arroz con pollo", "Pastel de chocolate"],
        ["Ensalada César", "Pizza margarita", "Gelatina de limón"],
        ["Sopa minestrone", "Hamburguesa con queso", "Batido de fresa"],
        ["Ensalada de atún", "Paella mixta", "Mousse de chocolate"],
        ["Caldo de pollo", "Tacos de carne asada", "Tiramisú"],
        ["Ensalada griega", "Risotto de champiñones", "Natillas caseras"],
        ["Sopa de calabaza", "Pescado al horno", "Fruta del tiempo"],
        ["Ensalada de aguacate", "Pasta primavera", "Yogur con frutas"],
        ["Crema de calabacín", "Pechuga de pollo a la parrilla", "Helado de fresa"],
        ["Ensalada de quinoa", "Filete de ternera con verduras", "Tarta de queso"],
        ["Gazpacho", "Huevos rotos con jamón", "Fruta variada"],
        ["Ensalada de espinacas", "Pescado a la plancha", "Natillas"],
        ["Sopa de cebolla", "Ternera estofada", "Pastel de zanahoria"],
        ["Ensalada de tomate y mozzarella", "Arroz tres delicias", "Fruta fresca"],
        ["Gazpacho", "Lasaña vegetal", "Flan de huevo"],
        ["Ensalada Waldorf", "Pollo al curry con arroz", "Gelatina de frutas"],
        ["Sopa de lentejas", "Bistec a la parrilla", "Tarta de manzana"],
        ["Ensalada de remolacha", "Pasta al pesto", "Yogur con miel"],
        ["Sopa de marisco", "Filete de merluza en salsa verde", "Helado de vainilla"],
        ["Ensalada de garbanzos", "Arroz negro", "Fruta del tiempo"],
        ["Gazpacho", "Pizza vegetal", "Tiramisú"],
        ["Ensalada de pasta", "Pechuga de pollo empanizada", "Gelatina de limón"],
        ["Crema de espárragos", "Tortilla de patatas", "Natillas caseras"],
        ["Ensalada de cous cous", "Salmón al horno", "Fruta variada"],
    ];

    // Devuelve los platos correspondientes al día actual
   
    const dayOfMonth = currentDate.getDate();
    return meals[dayOfMonth - 1] || [];
}
</script>

<style lang="scss" scoped>
ion-datetime {
    --background: #ffffff;
    --border-radius: 16px;
}
.ion-datetime-button {
    display: flex;
    justify-content: center;
    align-items: center;
}
.ion-datetime-button ion-label {
    margin-right: 8px;
}

.menuDay,
.hiddenDay {
    margin-top: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    width: 250px;
}

.menuDay strong {
    font-weight: bold;
    font-size: 16px;
}

.menuDay > div {
    margin-top: 8px;
}

/* Clase para ocultar visualmente los días vacíos */
.hiddenDay {
    visibility: hidden;
}
</style>
