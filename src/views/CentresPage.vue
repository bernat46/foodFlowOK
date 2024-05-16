<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
            <ion-title>Centres</ion-title>
        </ion-toolbar>
        </ion-header>
    
        <ion-content>
            <div class="body">
              <div class="title-content">
                <h2 class="page-title">{{ $t('centres.centres') }}</h2>
                <div>
                  <ion-icon :icon="addOutline" class="icon" @click="openModal('alta')" id="open-modal"></ion-icon>
                  <ion-icon :icon="trashOutline" class="icon"></ion-icon>
                </div>
              </div>
      
              <ion-grid>
                <ion-row class="centre-row" v-for="center in centers" :key="center.id" @click="editCenter(center)">
                  <!-- Columna imatge -->
                  <ion-col size-md="7" size-xs="12" class="image-col ion-no-padding">
                    <div class="centre-img">
                      <img :src="`src/assets/images/${center.imgSrc}`" alt="Center Image" />
                    </div>
                  </ion-col>
                  <!-- Columna informació -->
                  <ion-col size-md="5" size-xs="12" class="info-col ion-no-padding">
                    <div class="centre-info">
                      <div class="title">
                        <h2>{{ center.name }}</h2>
                        <div class="right-content">
                          <p>{{ center.people }}</p>
                          <ion-icon :icon="peopleOutline" class="icon"></ion-icon>
                        </div>
                      </div>
      
                      <hr>
                      <p>
                        {{ center.description }}
                        <br>
                        {{ center.address }}
                      </p>
                      <h5><strong>{{ $t('centres.contacte') }}</strong></h5>
                      <p class="pgf-2">
                        {{ center.contact.name }}
                        <br>
                        {{ center.contact.phone }}
                        <br>
                        {{ center.contact.email }}
                        <br>
                      </p>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </div>

            <ion-modal class="modal-alta" :is-open="isModalOpen('alta')" @willDismiss="onWillDismiss('alta')">
                <!-- Modal alta centre -->
                <ion-header>
                  <ion-toolbar>
                    <ion-buttons slot="start">
                      <ion-button @click="closeModal('alta')">{{$t('common.close')}}</ion-button>
                    </ion-buttons>
                    <ion-title>{{ $t('centres.donar_dalta') }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button :strong="true" @click="registerNewItem()">{{$t('common.guardar')}}</ion-button>
                    </ion-buttons>
                  </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                  <h5>{{ $t('centres.dades_centre') }}</h5>
                    <ion-input v-model="newItem.nom" :label="$t('common.nombre_cenrtro')" type="text" label-placement="stacked" ref="input" placeholder=""></ion-input>
                    <ion-input v-model="newItem.direccio" :label="$t('common.address')" type="text" label-placement="stacked" ref="input" placeholder=""></ion-input>
                    <ion-input v-model="newItem.descripcio" :label="$t('common.descripcion')" type="text" label-placement="stacked" ref="input" placeholder=""></ion-input>
                    <ion-input v-model="newItem.comensals" :label="$t('common.people')" type="number" label-placement="stacked" ref="input" placeholder=""></ion-input>
                    <ion-input v-model="newItem.img" type="file" @change="handleFileChange"></ion-input>

                    <h5>{{ $t('centres.dades_persona_contacte') }}</h5>
                    <ion-input v-model="newItem.nomP" :label="$t('common.nombre')" type="text" label-placement="stacked" ref="input"></ion-input>
                    <ion-input v-model="newItem.tel" :label="$t('common.phone')" type="tel" label-placement="stacked" ref="input"></ion-input>
                    <ion-input v-model="newItem.email" :label="$t('common.email')" type="email" label-placement="stacked" ref="input"></ion-input>
                </ion-content>
              </ion-modal>

              <ion-modal class="modal-alta" :is-open="isModalOpen('modify')" @willDismiss="onWillDismiss">
                <!-- Modal modificar centre -->
                <ion-header>
                  <ion-toolbar>
                    <ion-buttons slot="start">
                      <ion-button @click="closeModal('modify')">{{$t('common.close')}}</ion-button>
                    </ion-buttons>
                    <ion-title>{{ $t('centres.editar') }}</ion-title>
                    <ion-buttons slot="end">
                      <ion-button :strong="true" @click="updateCenter(editData)">{{$t('common.edit')}}</ion-button>
                    </ion-buttons>
                  </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                  <h5>{{ $t('centres.dades_centre') }}</h5>
                  <!-- Bind the input fields to editData properties -->
                  <ion-input v-model="editData.name" :label="$t('common.nombre_cenrtro')" type="text" label-placement="stacked" ref="input" placeholder=""></ion-input>
                  <ion-input v-model="editData.address" :label="$t('common.address')" type="text" label-placement="stacked" ref="input" placeholder=""></ion-input>
                  <ion-input v-model="editData.description" :label="$t('common.descripcion')" type="text" label-placement="stacked" ref="input" placeholder=""></ion-input>
                  <ion-input v-model="editData.people" :label="$t('common.people')" type="number" label-placement="stacked" ref="input"></ion-input>

                  <h5>{{ $t('centres.dades_persona_contacte') }}</h5>
                  <ion-input v-model="editData.contact.name" :label="$t('common.nombre')" type="text" label-placement="stacked" ref="input"></ion-input>
                  <ion-input v-model="editData.contact.phone" :label="$t('common.phone')" type="tel" label-placement="stacked" ref="input"></ion-input>
                  <ion-input v-model="editData.contact.email" :label="$t('common.email')" type="email" label-placement="stacked" ref="input"></ion-input>
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

const modalState = ref({
  alta: {
    isOpen: false,
    newItem: {
      nom: '',
      direccio: '',
      img: '',
      comensals: null,
      nomP: '',
      tel: '',
      email: ''
    }
  },
  modify: {
    isOpen: false
  }
});

const input = ref();


const openModal = (context, data) => {
  if(data) {
    editData.value = data; // If data is passed, set it to editData
  }
  modalState.value[context].isOpen = true;
};

const closeModal = (context) => {
  modalState.value[context].isOpen = false;
};

const isModalOpen = (context) => {
  return modalState.value[context].isOpen;
};

const onWillDismiss = (context) => {
  console.log('Modal close:', context);
};

const editData = ref({});

const centers = ref([
  {
    id: 1,
    name: 'Safa Sabadell',
    imgSrc: ('safa.png'),
    description: 'Sagrada Familia Sabadell',
    address: 'Carrer industria, 12',
    people: '10',
    contact: {
      name: 'Maria Pilar',
      phone: '987654321',
      email: 'safa@gmail.com'
    }
  },
  {
    id: 2,
    name: 'Escola Pia I',
    imgSrc: ('escola-pia.jpg'),
    description: 'Escola pia Barcelona',
    address: 'Carrer aragò, 49',
    people: '114',
    contact: {
      name: 'Manel Vidal',
      phone: '987654321',
      email: 'escolapia@gmail.com'
    }
  },
  {
    id: 2,
    name: 'Escola Pia II',
    imgSrc: ('escola-pia2.jpg'),
    description: 'Escola pia Sabadell',
    address: 'Rambla, 134',
    people: '294',
    contact: {
      name: 'Gerard Buxo',
      phone: '987654321',
      email: 'escolapiasabadell@gmail.com'
    }
  }
]);

const registerNewItem = () => {
  const newItemData = modalState.value.alta.newItem;
  const newCenter = {
    id: centers.value.length + 1,
    name: newItemData.nom,
    imgSrc: "escola.jpg",
    people: newItemData.comensals,
    description: newItemData.nom, // Change this according to your data structure
    address: newItemData.direccio, // Change this according to your data structure
    contact: {
      name: newItemData.nomP,
      phone: newItemData.tel,
      email: newItemData.email
    }
  };
  centers.value.push(newCenter);
  console.log('Alta nou centre: ', newCenter);
  closeModal('alta');
};

const newItem = ref(modalState.value.alta.newItem);

const editCenter = (center) => {
    editData.value = { ...center };
    openModal('modify', editData.value);
};

const updateCenter = () => {
  const centerIndex = centers.value.findIndex(center => center.id === editData.value.id);
  if (centerIndex !== -1) {
    centers.value[centerIndex] = { ...editData.value };
    console.log('Center updated:', centers.value[centerIndex]);
  }
  closeModal('modify');
};

</script>



<style lang="scss" scoped>
.body{
    width: 90%;
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
