<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
    <ion-item
        lines="none"
        :button="isButton"
        v-if="inputName"
        :class="[
            { 'input-error': validation && validation[`${inputName}`].$errors.length },
            { 'no-end-padding': noEndPadding },
            { 'ion-item-upload-tattoo': isUploadTattooPage },
            { 'ion-item-light': isLightComponent },
            { 'small-component': isSmallComponent },
        ]"
    >
        <div
            class="div-input-content"
            :class="[
                { 'input-padding': hasPadding },
                { 'flex-content': flexContent },
                { 'private-input': inputName == 'private' },
            ]"
        >
            <slot />
            <div v-if="validation" v-for="error of validation[inputName].$errors" :key="error.$uid">
                <div class="error-message">{{ error.$message }}</div>
            </div>
        </div>
    </ion-item>
</template>

<script>
import { IonItem } from "@ionic/vue";

export default {
    props: {
        validation: {
            type: Object,
            default: null,
        },
        inputName: {
            type: String,
            default: null,
        },
        isButton: {
            type: Boolean,
            default: false,
        },
        hasPadding: {
            type: Boolean,
            default: false,
        },
        noEndPadding: {
            type: Boolean,
            default: false,
        },
        flexContent: {
            type: Boolean,
            default: false,
        },
        isUploadTattooPage: {
            type: Boolean,
            default: false,
        },
        isLightComponent: {
            type: Boolean,
            default: false,
        },
        isSmallComponent: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        IonItem,
    },
};
</script>

<style lang="scss" scoped>
ion-item {
    --background: #161a1d;
    border-radius: 15px;
    margin-bottom: 12px;
}

.ion-item-upload-tattoo {
    --background: none;
}

.ion-item-light {
    --background: #fff;

    .form-input {
        --color: #000 !important;
        color: #000 !important;
    }
}

.input-error {
    border: 2px solid var(--ion-color-danger-shade);
}

.error-message {
    color: var(--ion-color-danger-shade);
    font-size: 12px;
    padding-bottom: 5px;
}

.input-padding {
    padding-top: 10px;
    padding-bottom: 10px;
}

.div-input-content {
    width: 100%;
}
.no-end-padding {
    --inner-padding-end: 0px;
}

.flex-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.small-component {
    --min-height: 35px !important;
    border-radius: 10px;
}
</style>
