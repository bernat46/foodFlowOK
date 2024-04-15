<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <img src="@/assets/images/logo.png" class="logo" />
          <!-- Horizontal Menu -->
            <ion-buttons class="horizontal-menu" slot="end">
                <ion-button @click="navigateTo('inici')">Inici</ion-button>
                <ion-button @click="navigateTo('serveis')">Serveis</ion-button>
                <ion-button @click="navigateTo('plans')">Plans</ion-button>
                <ion-button @click="navigateTo('contacte')">Contacte</ion-button>
            </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <div class="swiper-container" ref="swiperContainer">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="@/assets/images/slider1.jpg" alt="Slider Image 1" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/images/slider2.jpg" alt="Slider Image 2" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/images/slider3.jpg" alt="Slider Image 3" />
            </div>
          </div>
          <div class="swiper-button-prev" @click="prevSlide"></div>
          <div class="swiper-button-next" @click="nextSlide"></div>
          <div class="swiper-pagination"></div>
        </div>

        <div class="image-text-section">
          <ion-row>
            <ion-col size="12" size-md="6">
              <img ref="currentImage" src="@/assets/images/escola-pia.jpg" alt="Left Image" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
              <p>Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
            </ion-col>
          </ion-row>
        </div>
  
        
      </ion-content>
  
      
    </ion-page>
  </template>
  
  <script setup>
  import Swiper from 'swiper';
  import 'swiper/swiper-bundle.css';
  import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
  
  let swiperInstance = null;
  
  // Initialize Swiper after the component is mounted
  import { onMounted, onBeforeUnmount } from 'vue';
  
  onMounted(() => {
    swiperInstance = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
  
  onBeforeUnmount(() => {
    if (swiperInstance !== null) {
      swiperInstance.destroy();
      swiperInstance = null;
    }
  });
  
  // Slide previ
  const prevSlide = () => {
    if (swiperInstance !== null) {
      swiperInstance.slidePrev();
    }
  };
  
  // Slide seguent
  const nextSlide = () => {
    if (swiperInstance !== null) {
      swiperInstance.slideNext();
    }
  };
  </script>
  
  <style scoped>

  toolbar-title-default{
    display: none;
  }

  ion-toolbar{
    display: flex;
    justify-content:space-around;
    height: 150px;
    padding: 0px 100px;
  }

  ion-toolbar img{
    width: 200px;
    height: 80px;
  }
  .swiper-container {
    width: 100%;
    height: 500px; /* Adjust slider height as needed */
    position: relative;
  }
  
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-text-section {
    padding: 40px 0;
  }
  
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
  }
  
  .swiper-button-prev {
    left: 20px;
  }
  
  .swiper-button-next {
    right: 20px;
  }
  </style>
  