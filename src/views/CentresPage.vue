    <template>
        <ion-page>
            <ion-header>
            <ion-toolbar>
                <ion-title>Centers</ion-title>
            </ion-toolbar>
            </ion-header>
        
            <ion-content>
                <div class="body">
                    <div class="title-content">
                        <h2 class="page-title">Centres</h2>
                        <div>
                            <ion-icon :icon="addOutline" class="icon" id="open-modal"></ion-icon>
                            <ion-icon :icon="trashOutline" class="icon"></ion-icon>
                        </div>   
                    </div>
                    
                    <ion-grid >
                        <!-- Example rows with center information -->
                        <ion-row class="centre-row">
                        <!-- Image column -->
                        <ion-col size-md="7" size-xs="12" class="image-col ion-no-padding">
                            <div class="centre-img">
                            <img src="@/assets/images/safa.png" alt="Center Image" />
                            </div>
                        </ion-col>
                        <!-- Info column -->
                        <ion-col size-md="5" size-xs="12" class="info-col ion-no-padding">
                            <div class="centre-info">
                                <div class="title">
                                    <h2>Barcelona</h2>
                                    <div class="right-content">
                                    <p>150</p>
                                    <ion-icon :icon="peopleOutline" class="icon"></ion-icon>
                                    </div>
                                </div>                      
                                
                                <hr>
                                <p>
                                    Escola pia Barcelona
                                    <br>
                                    Carrer aragò, 1234
                                </p>
                                <h5><strong>Contacte</strong></h5>
                                <p class="pgf-2">
                                    Joaquim Quim
                                    <br>
                                    987654321
                                    <br>
                                    escolapia@gmail.com
                                    <br>
                                </p>
                            </div>
                        </ion-col>
                        </ion-row>
        
                        <ion-row class="centre-row" id="open-modal-modify">
                            <!-- Image column -->
                            <ion-col size-md="7" size-xs="12" class="image-col ion-no-padding">
                                <div class="centre-img">
                                <img src="@/assets/images/escola-pia.jpg" alt="Center Image" />
                                </div>
                            </ion-col>
                            <!-- Info column -->
                            <ion-col size-md="5" size-xs="12" class="info-col ion-no-padding">
                                <div class="centre-info">
                                    <div class="title">
                                        <h2>Barcelona</h2>
                                        <div class="right-content">
                                        <p>150</p>
                                        <ion-icon :icon="peopleOutline" class="icon"></ion-icon>
                                        </div>
                                    </div>                      
                                    
                                    <hr>
                                    <p>
                                        Escola pia Barcelona
                                        <br>
                                        Carrer aragò, 1234
                                    </p>
                                    <h5><strong>Contacte</strong></h5>
                                    <p class="pgf-2">
                                        Joaquim Quim
                                        <br>
                                        987654321
                                        <br>
                                        escolapia@gmail.com
                                        <br>
                                    </p>
                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>

                <ion-modal class="modal-alta"  ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
                    <ion-header>
                      <ion-toolbar>
                        <ion-buttons slot="start">
                          <ion-button @click="cancel()">Tancar</ion-button>
                        </ion-buttons>
                        <ion-title>Alta Centre</ion-title>
                        <ion-buttons slot="end">
                          <ion-button :strong="true" @click="confirm()">Donar d'alta</ion-button>
                        </ion-buttons>
                      </ion-toolbar>
                    </ion-header>
                    <ion-content class="ion-padding">
                        <h5>Dades centre</h5>
                        <ion-input
                        label="Nom Centre (únic)"
                        label-placement="stacked"
                        ref="input"
                        type="text"
                        placeholder="Barcelona I"
                        ></ion-input>
                        <ion-input
                        label="Direcció"
                        label-placement="stacked"
                        ref="input"
                        type="text"
                        placeholder="C/ Aragò 24"
                        ></ion-input>
                        <ion-input
                        label="Imatge"
                        label-placement="stacked"
                        ref="input"
                        type="img"
                        ></ion-input>
                        <h5>Dades persona contacte</h5>
                        <ion-input
                        label="Nom"
                        label-placement="stacked"
                        ref="input"
                        type="text"
                        ></ion-input>
                        <ion-input
                        label="Telèfon"
                        label-placement="stacked"
                        ref="input"
                        type="tel"
                        ></ion-input>
                        <ion-input
                        label="Email"
                        label-placement="stacked"
                        ref="input"
                        type="email"
                        ></ion-input>
                    </ion-content>
                </ion-modal>

                <ion-modal class="modal-alta"  ref="modal" trigger="open-modal-modify" @willDismiss="onWillDismiss">
                    <ion-header>
                      <ion-toolbar>
                        <ion-buttons slot="start">
                          <ion-button @click="cancel()">Tancar</ion-button>
                        </ion-buttons>
                        <ion-title>Editar Centre</ion-title>
                        <ion-buttons slot="end">
                          <ion-button :strong="true" @click="confirm()">Donar d'alta</ion-button>
                        </ion-buttons>
                      </ion-toolbar>
                    </ion-header>
                    <ion-content class="ion-padding">
                        <h5>Dades centre</h5>
                        <ion-input
                        label="Nom Centre (únic)"
                        label-placement="stacked"
                        ref="input"
                        type="text"
                        placeholder="Barcelona I"
                        ></ion-input>
                        <ion-input
                        label="Direcció"
                        label-placement="stacked"
                        ref="input"
                        type="text"
                        placeholder="C/ Aragò 24"
                        ></ion-input>
                        <ion-input
                        label="Imatge"
                        label-placement="stacked"
                        ref="input"
                        type="img"
                        ></ion-input>
                        <h5>Dades persona contacte</h5>
                        <ion-input
                        label="Nom"
                        label-placement="stacked"
                        ref="input"
                        type="text"
                        ></ion-input>
                        <ion-input
                        label="Telèfon"
                        label-placement="stacked"
                        ref="input"
                        type="tel"
                        ></ion-input>
                        <ion-input
                        label="Email"
                        label-placement="stacked"
                        ref="input"
                        type="email"
                        ></ion-input>
                    </ion-content>
                </ion-modal>
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
        IonRow,
        IonGrid,
        IonCol,
        IonIcon,
        IonModal,
        IonButton,
        IonInput,
    } from "@ionic/vue";

import {  peopleOutline, trashOutline, addOutline } from "ionicons/icons";
import { ref } from 'vue';

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

    </script>
    <style lang="scss" scoped>
    .body{
        width: 1400px;
        margin: auto;
    }

    .title-content{
        display: flex;
        justify-content: space-between;
    }

    .title-content div{
        padding-right: 55px;
        margin-top: 20px;
        font-size: 1.5rem;
    }

    ion-content .page-title{
        padding-left: 55px;
        margin-top: 20px;
        margin-bottom: 0px;
    }

    .modal-alta ion-input{
        border-bottom: 0.1px solid rgb(44, 138, 0, 0.77)
    }

    .modal-alta ion-title{
        text-align: center;

    }

    .centre-img:hover,
    .centre-info:hover,
    #open-modal:hover{
        cursor: pointer;
    }

    .centre-row {
        padding: 20px 50px;
    }

    @media (max-width: 740px) {
        .centre-row {
            padding: 20px 20px;
        }

        ion-content .page-title,
        .title-content div{
            padding: 0px 25px;
        }
    }

    @media (max-width: 400px) {
        .centre-row{
            padding: 20px 5px;
        }

        ion-content .page-title,
        .title-content div {
            padding: 0px 10px;
        }
    }
    
    .image-col {
        display: flex;
        align-items: center;
        max-height: 250px;
    }
    
    .centre-img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    .centre-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .centre-info {
        padding: 10px;
        background-color: #eeeeee;
        height: 100%;
    }

    .centre-info .title{
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .centre-info .title h2{
        margin: 0;
    }

    .centre-info .title .right-content {
        display: flex;
        margin-top: 4px;
    }

    .centre-info .title .right-content p{
        margin: 0;
        margin-right: 3px;
    }

    .centre-info h5{
        margin-top: 35px;
        margin-bottom: 0px;
    }

    .centre-info .pgf-2{
        margin-top: 7px;
        margin-bottom: 0;
    }

    .centre-info ion-icon{
        margin-top: 1px;
    }

    hr {
        background: black;
    }
    </style>
    