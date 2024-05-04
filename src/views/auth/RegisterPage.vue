<template>
    <ion-page>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <div class="div-logo">
                        <img src="@/assets/images/logo.png" alt="" srcset="" />
                    </div>
                    <div class="div-registration-form">
                        <ion-item-group class="register-user-data-group">
                            <!-- Email -->
                            <form-input :validation="v$.registration" input-name="email">
                                <ion-input
                                    v-model.trim="registration.email"
                                    type="email"
                                    ref="email"
                                    :label="$t('auth.registration.email')"
                                    label-placement="floating"
                                    class="form-input"
                                    ></ion-input>
                                    <!-- @ionBlur="checkEmailExists" -->
                            </form-input>
                            <!-- Nombre -->
                            <form>
                                <form-input :validation="v$.registration" input-name="firstname">
                                    <ion-input
                                        v-model="registration.firstname"
                                        ref="firstname"
                                        :label="$t('auth.registration.firstname')"
                                        label-placement="floating"
                                        class="form-input"
                                    ></ion-input>
                                </form-input>
                            </form>
                            <!-- Apellido -->
                            <form>
                                <form-input :validation="v$.registration" input-name="lastname">
                                    <ion-input
                                        v-model="registration.lastname"
                                        ref="lastname"
                                        :label="$t('auth.registration.lastname')"
                                        label-placement="floating"
                                        class="form-input"
                                    ></ion-input>
                                </form-input>
                            </form>

                            <!-- User name -->
                            <form-input :validation="v$.registration" input-name="username">
                                <ion-input
                                    v-model="registration.username"
                                    :label="$t('auth.registration.username')"
                                    label-placement="floating"
                                    ref="username"
                                    class="form-input"
                                    ></ion-input>
                                    <!-- @ionBlur="checkUsernameExists" -->
                            </form-input>

                            <form>
                                <div class="privateChip">
                                    <ion-badge id="private-chip" mode="ios" @click="openPopover('password')"
                                        >?</ion-badge
                                    >
                                    <form-input :validation="v$.registration" input-name="password">
                                        <div class="password-input-container">
                                            <ion-input
                                                :type="visible ? 'text' : 'password'"
                                                v-model="registration.password"
                                                ref="password"
                                                :label="$t('auth.option_password.password')"
                                                label-placement="floating"
                                                @change="
                                                    visible
                                                        ? (registration.confirmPassword = registration.password)
                                                        : null
                                                "
                                                class="form-input"
                                            ></ion-input>
                                            <ion-icon
                                                style="width: 20px"
                                                class="password-toggle-icon"
                                                :icon="visible ? eye : eyeOff"
                                                @click="
                                                    visible = !visible;
                                                    registration.confirmPassword = registration.password;
                                                "
                                            ></ion-icon>
                                        </div>
                                    </form-input>
                                </div>
                            </form>
                            <ion-popover ref="password" trigger-action="click">
                                <ion-content class="ion-padding">{{
                                    $t("auth.registration.password_chip")
                                }}</ion-content>
                            </ion-popover>
                            <form>
                                <form-input v-if="!visible" :validation="v$.registration" input-name="confirmPassword">
                                    <ion-input
                                        v-model="registration.confirmPassword"
                                        ref="confirmPassword"
                                        :label="$t('auth.option_password.confirmPassword')"
                                        label-placement="floating"
                                        type="password"
                                        class="form-input"
                                    ></ion-input>
                                </form-input>
                            </form>
                           
                        </ion-item-group>

                        <form-input :validation="v$.registration" input-name="termsOfUse">
                            <ion-item lines="none">
                                <ion-label class="ion-text-wrap">
                                    {{ $t("auth.registration.terms_of_use_1") }}
                                    <a href="" target="_blank">
                                        {{ $t("auth.registration.terms_of_use_2") }}
                                    </a>
                                </ion-label>
                                <ion-toggle
                                    slot="end"
                                    class="toggle-temsOfUse"
                                    v-model="registration.termsOfUse"
                                    color="secondary"
                                    aria-label="Terms of service"
                                ></ion-toggle>
                            </ion-item>
                        </form-input>

                        <ion-button
                            color="primary"
                            expand="block"
                            @click="registerFEvent()"
                            :disabled="isOpenRegistering"
                        >
                            {{ $t("auth.options.register") }}
                        </ion-button>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
        <!-- @click="countrySelectionChanged($event)" -->
        <!-- @language-changed="updateCountry()" -->
        <language-changer :is-floating-button="true" />
        <ion-loading :message="$t('auth.options.logging_in')" :is-open="isOpenLoading"> </ion-loading>
        <ion-loading :message="$t('auth.options.registering')" :is-open="isOpenRegistering"> </ion-loading>

        <alert-pop
            :is-open="showAlert"
            :headerText="headerText"
            :alertButtons="alertButtons"
            @dismiss="toggleAlert"
            :type="'error'"
        />
    </ion-page>
</template>

<script>
import {
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    IonPage,
    IonToggle,
    IonLabel,
    IonContent,
    IonItemGroup,
    IonPopover,
    IonBadge,
    IonLoading,
} from "@ionic/vue";

import { useVuelidate } from "@vuelidate/core";
import countryList from "@/assets/js/countries";

import LanguageChanger from "@/components/settings/LanguageChanger.vue";
import AlertPop from "@/components/alert/AlertPop.vue";

import {
    required,
    isTrue,
    invalidEmail,
    containsUppercase,
    containsLowercase,
    containsNumber,
    containsSpecial,
    minLength,
    sameAs,
    userExists,
    emailExists,
} from "@/utils/i18n-validators";
import { eye, eyeOff } from "ionicons/icons";
import { ref } from "vue";

import FormInput from "@/components/form/FormInput.vue";

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
        IonToggle,
        IonLabel,
        IonContent,
        IonItemGroup,
        IonPopover,
        IonBadge,
        IonLoading,
        LanguageChanger,
        FormInput,
        AlertPop,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            isCountryModalOpen: false,
            eye,
            eyeOff,
            visible: false,
            countryList,
            registration: {
                username: null,
                email: null,
                password: null,
                confirmPassword: null,
                termsOfUse: false,
                firstname:null,
                lastname:null,
            },
            countryObject: null,
            userExists: null,
            emailExists: null,
            alertButtons: ["OK"],
            headerText: ref(null),
            showAlert: ref(false),
            isOpenLoading: ref(false),
            isOpenRegistering: ref(false),
        };
    },
    validations() {
        return {
            registration: {
                username: { required, userExists: userExists(this.userExists) },
                firstname:{required},
                lastname:{required},
                password: {
                    required,
                    containsUppercase,
                    containsLowercase,
                    containsNumber,
                    containsSpecial,
                    minLength: minLength(8),
                },
                confirmPassword: {
                    required,
                    containsUppercase,
                    containsLowercase,
                    containsNumber,
                    containsSpecial,
                    minLength: minLength(8),
                    sameAs: sameAs(this.registration.password),
                },
                email: {
                    required,
                    invalidEmail,
                    emailExists: emailExists(this.emailExists),
                },
                // termsOfUse: { required },
                termsOfUse: {
                    isTrue,
                },
            },
        };
    },
    methods: {
        toggleAlert() {
            this.showAlert = !this.showAlert;
        },
        // watch(locale) {
        //     this.$store.getters["common/currentLocale"].value;
        // },
        openPopover(field) {
            const formInput = this.$refs.username.$el;
            const rect = formInput.getBoundingClientRect();
            this.$refs[field].$el.present({
                event: {
                    clientX: rect.x,
                    clientY: rect.y,
                },
            });
        },
        async registerFEvent() {
            const isFormValid = await this.v$.$validate();
            if (isFormValid) {
                try {
                    this.isOpenRegistering = true;
                   await  $auth.registerUser({...this.registration,role:1})
                    await  $auth.login(this.registration.email,this.registration.password)
                    // const registerUserResponse = await this.$store.dispatch("auth/registerF", {
                    //     email: this.registration.email,
                    //     password: this.registration.password,
                    // });
                    switch (registerUserResponse) {
                        case true:
                            break;
                        case "email_already_in_use":
                            this.headerText = this.$t("auth.option_password.error.email_already_in_use");
                            this.showAlert = true;
                            throw new Error();
                        case "invalid_email":
                            this.headerText = this.$t("auth.option_password.error.invalid_email");
                            this.showAlert = true;
                            throw new Error();
                        case "operation-not-allowed":
                            this.headerText = this.$t("auth.option_password.error.operation_not_allowed");
                            this.showAlert = true;
                            throw new Error();
                        case "weak-password":
                            this.headerText = this.$t("auth.option_password.error.weak_password");
                            this.showAlert = true;
                            throw new Error();
                        default:
                            this.headerText = this.$t("auth.option_password.error.something_wrong");
                            this.showAlert = true;
                            throw new Error();
                    }

                    await this.loginFEvent(this.registration.email, this.registration.password);
                } catch (error) {
                    this.isOpenRegistering = false;
                    this.loginError = true;
                    this.headerText = this.$t("auth.option_password.error.something_wrong");
                    this.showAlert = true;
                }
            }
            if (!this.v$.$errors[0]) return;
            const errorInputName = this.v$.$errors[0].$property;
            this.$refs[errorInputName].$el.setFocus();
        },
        async loginEvent(email, password) {
            try {
                this.isOpenLoading = true;
                await this.$store.dispatch("auth/loginF", {
                    email: email,
                    password: password,
                });
                this.isOpenLoading = false;
                this.$router.push("/feed");
            } catch (error) {
                this.isOpenLoading = false;
                this.loginError = true;
                this.headerText = this.$t("auth.option_password.error.something_wrong");
                this.showAlert = true;
            }
        },
        // async checkUsernameExists() {
        //     try {
        //         let usernameExists = await this.$store.dispatch("user/checkUsername", this.registration.username);
        //         this.userExists = Boolean(usernameExists);
        //     } catch (error) {
        //         this.userExists = false;
        //     }
        // },
        // async checkEmailExists() {
        //     try {
        //         let user = await this.$store.dispatch("user/getUserByEmail", this.registration.email);
        //         this.emailExists = Boolean(user);
        //     } catch (error) {
        //         this.emailExists = false;
        //     }
        // },
    },
    ionViewDidLeave() {
        this.registration = {
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
            termsOfUse: null,
        };
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
    margin-top: 5%;
    margin-bottom: 5%;
    width: 50%;
}

.div-registration-form {
    margin-left: 10% !important;
    margin-right: 10% !important;
    margin-bottom: 10% !important;
    text-align: center;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 80%;

    ion-text {
        margin-bottom: 18%;
    }
    .register-user-data-group {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }
}

ion-item {
    --background: var(--ion-color-step-850);
    border-radius: 15px;
    margin-bottom: 12px;
    width: 100%;
}

ion-popover ion-content {
    --background: #ffffff;
    --color: #000000 !important;
}

ion-icon {
    width: 70px;
    height: 70px;
}

ion-button {
    font-weight: 700;
    --padding-top: 25px;
    --padding-bottom: 25px;
    --border-radius: 15px;
}

.text-error {
    color: var(--ion-color-danger);
    margin-bottom: 10px !important;
    font-weight: 600 !important;
}

// ion-toggle {
//     color: #7c8082 !important;
//     font-weight: 600;
//     opacity: 0.8;
// }

p {
    font-size: 16px !important;
    &.text-select {
        color: #7c8082 !important;
        opacity: 0.8;
        font-weight: 600 !important;
    }

    &.text-selected {
        color: #fff !important;
        font-weight: 400 !important;
    }
}
ion-chip {
    --background: #161a1d;
    --color: #7c8082 !important;
    margin-bottom: 12px;
}
.privateChip {
    display: flex;
    position: relative;
}
ion-badge {
    position: absolute;
    z-index: 2;
    right: 0;
    transform: translate(10px, 0px);
    --background: var(--ion-color-secondary);
    --color: #000000 !important;
}
.keepPrivateInput {
    width: 85%;
}
.keepTextInput {
    white-space: normal;
}
.custom-fieldset {
    border: 2px solid #161a1d;
    border-radius: 12px;
    padding: 16px;
    margin: 16px 0;
}
.password-input-container {
    position: relative;
}

.password-toggle-icon {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
}
.temsOfUse {
    --track-background-checked: white;
}
</style>
@/services/appService/auth.js