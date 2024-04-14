    <template>
        <ion-page>
            <ion-header>
            <ion-toolbar>
                <ion-title>Centers</ion-title>
            </ion-toolbar>
            </ion-header>
        
            <ion-content>
            <div class="title-content">
                <h2 class="page-title">Centres</h2>
                <div>
                    <ion-icon :icon="addOutline" class="icon"></ion-icon>
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

                <ion-row class="centre-row">
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
    } from "@ionic/vue";
import {  peopleOutline, trashOutline, addOutline } from "ionicons/icons";

    </script>
    <style lang="scss" scoped>
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
    