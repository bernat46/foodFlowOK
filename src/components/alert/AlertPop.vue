<template>
    <ion-alert
        :is-open="isOpen"
        :header="headerText"
        :message="message"
        :buttons="alertButtons"
        :style="{ 'font-size': '12px' }"
        @didDismiss="toggleAlert"
        :class="{
            alpha: fontSize == true,
            error: type == 'error',
            info: type == 'info',
            success: type == 'success',
            default: type == null,
        }"
    ></ion-alert>
</template>

<script>
import { IonAlert } from "@ionic/vue";
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        headerText: {
            type: String,
            default: null,
        },
        alertButtons: {
            type: Array,
            default: null,
        },
        fontSize: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: null,
        },
        message: {
            type: String,
            default: null,
        },
    },
    components: {
        IonAlert,
    },
    methods: {
        toggleAlert() {
            this.$emit("dismiss");
        },
    },
};
</script>
<style lang="scss" scoped>
.error div.alert-wrapper {
    background-color: #f8d7da;
}
.error div.alert-wrapper * {
    color: black;
}
.info div.alert-wrapper {
    background-color: blue;
}

.success div.alert-wrapper {
    background-color: green;
}

.warning div.alert-wrapper {
    background-color: orange;
}

.default div.alert-wrapper {
    background-color: var(--ion-background-color);
    border: 1px solid var(--ion-color-secondary);
    border-radius: 10px;
}
ion-alert div.alert-head {
    overflow-y: scroll;
}
ion-alert.alpha h2 {
    font-size: 15px !important;
    line-height: 2;
}
</style>
