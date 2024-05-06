<template>
    <ion-page>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <div class="div-logo">
                        <img src="@/assets/images/logo.png" alt="" srcset="" />
                    </div>

                    <div class="div-login-form">
                        <ion-item>
                            <ion-input
                                :label="$t('auth.option_password.email')"
                                label-placement="floating"
                                class="form-input"
                                type="email"
                                v-model.trim="email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <div class="password-input-container">
                                <ion-input
                                    :label="$t('auth.option_password.password')"
                                    label-placement="floating"
                                    class="form-input"
                                    :type="visible ? 'text' : 'password'"
                                    v-model="password"></ion-input>

                                <ion-icon
                                    style="width: 20px"
                                    class="password-toggle-icon"
                                    :icon="visible ? eye : eyeOff"
                                    @click="visible = !visible"></ion-icon>
                            </div>
                        </ion-item>
                        <p class="text-error" v-if="loginError">
                            {{ textAlert }}
                        </p>
                        <ion-button
                            color="primary"
                            expand="block"
                            :disabled="!email || !password"
                            @click="loginFEvent()"
                            >{{ $t("auth.option_password.login") }}
                        </ion-button>
                        <ion-button
                            color="primary"
                            expand="block"
                            @click="$router.push('/register')">
                            {{ $t("auth.options.register") }}
                        </ion-button>
                        <ion-button
                            fill="clear"
                            class="btn-face-auth recover-password"
                            color="secondary"
                            @click="
                                isForgotPasswordModalVisible =
                                    !isForgotPasswordModalVisible
                            ">
                            {{ $t("auth.option_password.recover_password") }}
                        </ion-button>
                    </div>

                    <!-- <alert-pop
                        :is-open="showAlert"
                        :headerText="$t('auth.options.coming_soon')"
                        :alertButtons="alertButtons"
                        @dismiss="toggleAlert"
                    /> -->
                </ion-col>
            </ion-row>
        </ion-grid>
        <language-changer :is-floating-button="true" />
        <!-- <forgot-password-modal
            :key="forgotPasswordKey"
            :is-modal-open="isForgotPasswordModalVisible"
            @close-modal="closePasswordModal"
            @success="
                () => {
                    this.forgotPasswordAlert = true;
                }
            "
        /> -->
        <ion-loading
            :message="$t('auth.options.logging_in')"
            :is-open="isOpenLoading">
        </ion-loading>
    </ion-page>
</template>

<script>
import { ref } from "vue";
import { eye, eyeOff, close } from "ionicons/icons";
import {
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonPage,
    IonLoading,
} from "@ionic/vue";
import { fingerPrint } from "ionicons/icons";

import LanguageChanger from "@/components/settings/LanguageChanger.vue";

import $auth from "@/services/appService/auth.js";

export default {
    components: {
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonInput,
        IonIcon,
        IonButton,
        IonPage,
        IonLoading,
        LanguageChanger,
        // ForgotPasswordModal,
    },
    data() {
        return {
            email: null,
            password: null,
            fingerPrint,
            eye,
            close,
            visible: false,
            eyeOff,
            loginError: false,
            showAlert: ref(false),
            isOpenLoading: ref(false),
            isForgotPasswordModalVisible: ref(false),
            textAlert: ref(null),
            alertButtons: ["OK"],
            forgotPasswordAlert: false,
            forgotPasswordKey: 1,
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        closePasswordModal() {
            this.forgotPasswordKey++;
            this.isForgotPasswordModalVisible =
                !this.isForgotPasswordModalVisible;
        },
        async loginFEvent() {
            if (this.email && this.password) {
                this.loginError = false;
                try {
                    this.isOpenLoading = true;
                    const loginUserResponse = await $auth.login(
                        this.email,
                        this.password
                    );

                    switch (loginUserResponse) {
                        case true:
                            break;
                        case "user_not_found":
                            this.textAlert = this.$t(
                                "auth.option_password.error.user_not_found"
                            );
                            break;
                        case "invalid_email":
                            this.textAlert = this.$t(
                                "auth.option_password.error.invalid_email"
                            );
                            break;
                        case "wrong_password":
                            this.textAlert = this.$t(
                                "auth.option_password.error.wrong_password"
                            );
                            break;
                        case "invalid_credentials":
                            this.textAlert = this.$t(
                                "auth.option_password.error.invalid_credentials"
                            );
                            break;
                        default:
                            this.textAlert = this.$t(
                                "auth.option_password.error.something_wrong"
                            );
                            break;
                    }
                } catch (error) {
                    this.loginError = true;
                    this.isOpenLoading = false;
                }
            }
        },
        setAlert(value) {
            this.showAlert = value;
        },
        toggleAlert() {
            this.showAlert = !this.showAlert;
        },
    },
};
</script>

<style lang="scss" scoped>
ion-grid,
ion-row,
ion-col {
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.div-logo {
    width: 50%;
}

.div-login-form {
    width: 80%;
    text-align: center;
    margin-top: 10%;

    p {
        font-weight: 100;
        margin-bottom: 12%;
    }

    ion-text {
        margin-bottom: 18%;
    }
}

ion-item {
    --background: var(--ion-color-step-850);
    border-radius: 15px;
    margin-bottom: 12px;
}

.div-other-options {
    color: #7c8082;
    font-size: small;
    width: 80%;
    text-align: center;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

ion-icon {
    width: 70px;
    height: 70px;
}

.option-fingerprint {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        margin-bottom: 0;
    }
}

ion-button {
    font-weight: 700;
    --padding-top: 15px;
    --padding-bottom: 15px;
    --border-radius: 15px;
}

.btn-face-auth {
    font-weight: 400;
    margin-bottom: 20%;
    text-decoration: underline;
    color: #7c8082;
    font-size: small;
}
.recover-password {
    margin: 10px 0px 0px 0px;
}

.text-error {
    color: var(--ion-color-danger);
    margin-bottom: 10px !important;
    font-weight: 600 !important;
}
.password-input-container {
    position: relative;
    width: 90%;
}

.password-toggle-icon {
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
}
.goBackIcon {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    align-self: flex-end;
}
</style>
