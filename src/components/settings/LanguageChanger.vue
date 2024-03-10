<template>
    <ion-item v-if="!isFloatingButton" lines="full">
        <ion-label>{{ $t("settings.app.language") }}</ion-label>
        <ion-item slot="end" button @click="openPopoverEvent($event)" v-if="currentLocale">
            <ion-avatar slot="start">
                <img :alt="currentLocale.name" :src="currentLocale.flag" />
            </ion-avatar>
            <ion-label> {{ currentLocale.name }} </ion-label>
        </ion-item>
        <ion-popover :is-open="openPopover" :event="event" @didDismiss="openPopover = false">
            <ion-list>
                <ion-item
                    button
                    v-for="(language, index) in languageList"
                    :key="index"
                    @click="selectLanguage(language)"
                >
                    <ion-avatar slot="start">
                        <img :alt="language.name" :src="language.flag" />
                    </ion-avatar>
                    <ion-label> {{ language.name }} </ion-label>
                </ion-item>
            </ion-list>
        </ion-popover>
    </ion-item>
    <ion-fab v-if="isFloatingButton" slot="fixed" :vertical="vertical" :horizontal="horizontal">
        <ion-fab-button size="small">
            <ion-avatar>
                <img :alt="currentLocale.name" :src="currentLocale.flag" />
            </ion-avatar>
        </ion-fab-button>
        <ion-fab-list :side="side">
            <ion-fab-button v-for="(language, index) in languageList" :key="index" @click="selectLanguage(language)">
                <ion-avatar>
                    <img :alt="language.name" :src="language.flag" />
                </ion-avatar>
            </ion-fab-button>
        </ion-fab-list>
    </ion-fab>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
    IonItem,
    IonLabel,
    IonAvatar,
    IonPopover,
    IonList,
    IonFab,
    IonFabButton,
    IonFabList,
} from "@ionic/vue";
import {
    chevronDownCircle,
    chevronForwardCircle,
    chevronUpCircle,
    colorPalette,
    document,
    globe,
} from "ionicons/icons";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import flagUk from "@/assets/images/flags/uk.png";
import flagCatalan from "@/assets/images/flags/catalan.png";
import flagSpain from "@/assets/images/flags/spain.png";

export default {
    props: {
        isFloatingButton: {
            type: Boolean,
            default: false,
        },
        vertical: {
            type: String,
            default: "bottom",
        },
        horizontal: {
            type: String,
            default: "end",
        },
        side: {
            type: String,
            default: "top",
        },
    },
    components: {
        IonItem,
        IonLabel,
        IonAvatar,
        IonPopover,
        IonList,
        IonFab,
        IonFabButton,
        IonFabList,
    },
    emits: ["language-changed"],
    setup(props, { emit }) {
        const store = useStore();
        const { locale } = useI18n();

        const openPopover = ref(false);
        const event = ref(null);

        const languageList = computed(() => store.getters["common/languageList"]);
        const currentLocale = computed(() => store.getters["common/currentLocale"]);

        const openPopoverEvent = (e) => {
            event.value = e;
            openPopover.value = true;
        };

        const selectLanguage = (language) => {
            event.value = null;
            openPopover.value = false;
            locale.value = language.value;
            localStorage.setItem("locale", language.value);
            store.dispatch("common/setCurrentLocale", language);
            emit("language-changed");
        };

       

        onMounted(() => {
            if(currentLocale.value)return
            const defaultLocale = languageList.value.filter((item) => item.value == "es");
            if (defaultLocale && defaultLocale.length > 0) {
                store.dispatch("common/setCurrentLocale", defaultLocale[0]);
            }
        });

        return {
            openPopoverEvent,
            selectLanguage,
            openPopover,
            event,
            chevronDownCircle,
            chevronForwardCircle,
            chevronUpCircle,
            colorPalette,
            document,
            globe,
            flagUk,
            flagCatalan,
            flagSpain,
            languageList,
            currentLocale,
        };
    },
};
</script>
<style lang="scss" scoped>
ion-avatar {
    width: 25px;
    height: 25px;
}

ion-fab-button {
    --background: #252525;
    --color: var(--ion-color-secondary);
    width: 48px;
    height: 48px;
}

ion-fab {
    ion-avatar {
        width: 35px;
        height: 35px;
    }
}
</style>
