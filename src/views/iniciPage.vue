<template>
  <ion-page>
    <ion-header>
      <div class="body">
        <ion-toolbar>
          <img src="@/assets/images/logo.png" class="logo" />
          <!-- Horizontal Menu -->
          <ion-buttons class="horizontal-menu" slot="end">
            <ion-button @click="scrollToSection('inici',false)">Inici</ion-button>
            <ion-button @click="scrollToSection('serveis',false)">Serveis</ion-button>
            <ion-button @click="scrollToSection('plans',false)">Plans</ion-button>
            <ion-button @click="scrollToSection('contacte'),false">Contacte</ion-button>
            <ion-button class="menuButton" router-link="/login">Login</ion-button>
            <p>/</p>
            <ion-button class="menuButton" router-link="/register">Registre</ion-button>
          </ion-buttons>

          <ion-icon :icon="menuOutline" class="mobile-icon" slot="end" @click="openLinks"></ion-icon>
          
        </ion-toolbar>
      </div>
      <div class="topnav">
        <div id="myLinks">
          <a @click="scrollToSection('inici',true)">Inici</a>
          <a @click="scrollToSection('serveis',true)">Serveis</a>
          <a @click="scrollToSection('plans',true)">Plans</a>
          <a @click="scrollToSection('contacte',true)">Contacte</a>
          <ion-row>
            <a href="/login">Login</a><p>/</p><a href="/register">Registre</a>
          </ion-row>
        </div>
        
      </div>
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
      <div class="body">
        <div class="seccio-inici" id="inici">
          <ion-row class="row-inici">
            <ion-col class="col-left ion-no-padding" size-md="7" size-xs="12">
              <img
                class="img-inici"
                ref="currentImage"
                src="@/assets/images/slider/slider-1.png"
                alt="Left Image"
              />
            </ion-col>
            <div class="break"></div>
            <ion-col class="col-right" size-md="5" size-xs="12">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sit amet aliquet erat. Vestibulum sit amet ante quis sem ornare
                lacinia a vel neque. Proin a augue a urna malesuada blandit.
                Mauris quis justo eu dui pharetra luctus sed ut leo. Sed vel ex
                ut libero ornare scelerisque sed vel lacus. Pellentesque aliquet
                orci odio, ut faucibus metus tincidunt nec. Aliquam nibh eros,
                bibendum ac iaculis ac, mollis sed magna. Nulla lorem nisl,
                tristique et metus ut, volutpat auctor massa. Phasellus vel
                tincidunt justo. Curabitur a libero sed lacus condimentum
                laoreet vitae at justo.
              </p>
            </ion-col>
          </ion-row>
        </div>

        <ion-grid class="grid ion-no-padding" id="serveis">
          <h3><strong>Els nostres serveis</strong></h3>
          <ion-row>
            <ion-col size-md="6" size-lg="4" class="service">
              <div class="image-container">
                <div class="image-placeholder">
                  <img
                    src="@/assets/images/serveis/serveis-1.jpg"
                    alt="centres"
                  />
                </div>
                <div class="title">
                  <p>Gestió centres</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
                urna dapibus, scelerisque nibh sed, placerat enim. Fusce in
                volutpat orci. Suspendisse potenti. Quisque accumsan dapibus
                tortor, ac dictum nulla eleifend sit amet.
              </p>
            </ion-col>
            <ion-col size-md="6" size-lg="4" class="service">
              <div class="image-container">
                <div class="image-placeholder">
                  <img
                    src="@/assets/images/serveis/serveis-2.jpg"
                    alt="receptes"
                  />
                </div>
                <div class="title">
                  <p>Creació de plats i receptes</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
                urna dapibus, scelerisque nibh sed, placerat enim. Fusce in
                volutpat orci. Suspendisse potenti. Quisque accumsan dapibus
                tortor, ac dictum nulla eleifend sit amet.
              </p>
            </ion-col>
            <ion-col size-md="6" size-lg="4" class="service">
              <div class="image-container">
                <div class="image-placeholder">
                  <img src="@/assets/images/serveis/serveis-3.jpg" alt="menú" />
                </div>
                <div class="title">
                  <p>Confecció menús mensuals</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
                urna dapibus, scelerisque nibh sed, placerat enim. Fusce in
                volutpat orci. Suspendisse potenti. Quisque accumsan dapibus
                tortor, ac dictum nulla eleifend sit amet.
              </p>
            </ion-col>
            <ion-col size-md="6" size-lg="4" class="service">
              <div class="image-container">
                <div class="image-placeholder">
                  <img
                    src="@/assets/images/serveis/serveis-4.jpg"
                    alt="proveidors"
                  />
                </div>
                <div class="title">
                  <p>Gestió comandes i proveïdors</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
                urna dapibus, scelerisque nibh sed, placerat enim. Fusce in
                volutpat orci. Suspendisse potenti. Quisque accumsan dapibus
                tortor, ac dictum nulla eleifend sit amet.
              </p>
            </ion-col>
            <ion-col size-md="6" size-lg="4" class="service">
              <div class="image-container">
                <div class="image-placeholder">
                  <img
                    src="@/assets/images/serveis/serveis-5.jpg"
                    alt="stocks"
                  />
                </div>
                <div class="title">
                  <p>Control de stocks</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
                urna dapibus, scelerisque nibh sed, placerat enim. Fusce in
                volutpat orci. Suspendisse potenti. Quisque accumsan dapibus
                tortor, ac dictum nulla eleifend sit amet.
              </p>
            </ion-col>
            <ion-col size-md="6" size-lg="4" class="service">
              <div class="image-container">
                <div class="image-placeholder">
                  <img
                    src="@/assets/images/serveis/serveis-6.jpg"
                    alt="anàlisis"
                  />
                </div>
                <div class="title">
                  <p>Anàlisis i informes</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
                urna dapibus, scelerisque nibh sed, placerat enim. Fusce in
                volutpat orci. Suspendisse potenti. Quisque accumsan dapibus
                tortor, ac dictum nulla eleifend sit amet.
              </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
        <ion-grid class="grid2 ion-no-padding" id="plans">
      <div class="body">
          <h3>Plans de subscripció</h3>
          <ion-row class="plans">
            <!-- First Column -->
            <ion-col size-md="4" size-xs="12" class="column">
              <ion-list class="ion-no-padding">
                <ion-list-header>
                  <strong>Core</strong>
                </ion-list-header>
                <ion-item> Un únic centre </ion-item>
                <ion-item> 2 usuaris </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
              </ion-list>
            </ion-col>

            <ion-col size-md="4" size-xs="12" class="column">
              <ion-list class="ion-no-padding">
                <ion-list-header>
                  <strong>Basic</strong>
                </ion-list-header>
                <ion-item> Fins a 5 centres </ion-item>
                <ion-item> 5 usuaris </ion-item>
                <ion-item> Gestió stocks </ion-item>
                <ion-item> Suport 8/5 </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
              </ion-list>
            </ion-col>

            <ion-col size-md="4" size-xs="12" class="column">
              <ion-list class="ion-no-padding">
                <ion-list-header>
                  <strong>Enterprise</strong>
                </ion-list-header>
                <ion-item> Fins a 100 centres </ion-item>
                <ion-item> 10 usuaris </ion-item>
                <ion-item> Gestió stocks </ion-item>
                <ion-item> Secció anàlisis </ion-item>
                <ion-item> Suport 24/7 </ion-item>
                <ion-item> </ion-item>
                <ion-item> </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
      </div>
        </ion-grid>
       <!--Formulari contacte-->
      <div class="form" id="contacte">
        <h3><strong>Tens algun dubte ?<br>
            Contactan's</strong></h3>
        <ion-grid>
          <ion-row>
            <ion-col size-md="6" size-xs="12">
              <ion-item>
                <ion-label aria-label="name" position="floating">Name</ion-label>
                <ion-input  type="text"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size-md="6" size-xs="12">
              <ion-item>
                <ion-label aria-label="email" position="floating">Email</ion-label>
                <ion-input type="email"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="12">
              <ion-item>
                <ion-label aria-label="subject" position="floating">Subject</ion-label>
                <ion-input type="text"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="12">
              <ion-item>
                <ion-label id="message" position="floating">Message</ion-label>
                <ion-textarea class="message"></ion-textarea>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-button>Enviar</ion-button>
        </ion-grid>
      </div>

      <ion-footer class="custom-footer">
        <div class="body">
        <ion-grid class="footer-grid">
          <ion-row class="circle-row">
            <ion-col size="4" class="circle-col">
              <div class="circle"></div>
            </ion-col>
            <ion-col size="4" class="circle-col">
              <div class="circle"></div>
            </ion-col>
            <ion-col size="4" class="circle-col">
              <div class="circle"></div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid class="footer-grid2">
          <ion-row class="footer-other">
            <ion-col size="3">
              <p>Lorem ipsum</p>
            </ion-col>
            <ion-col size="3">
              <p>Lorem ipsum</p>
            </ion-col>
            <ion-col size="3">
              <p>Lorem ipsum</p>
            </ion-col>
            <ion-col size="3">
              <p>Lorem ipsum</p>
            </ion-col>
          </ion-row>
        </ion-grid>
        </div>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script setup>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRow,
  IonCol,
  IonButtons,
  IonGrid,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonFooter,
  IonIcon
} from "@ionic/vue";

let swiperInstance = null;

// Initialize Swiper after the component is mounted
import { onMounted, onBeforeUnmount } from "vue";
import { menuOutline } from "ionicons/icons";

onMounted(() => {
  swiperInstance = new Swiper(".swiper-container", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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

const openLinks = () => {
  const myLinks = document.getElementById("myLinks");
      if (myLinks.style.display === "block") {
        myLinks.style.display = "none";
      } else {
        myLinks.style.display = "block";
      }
}

const scrollToSection = (sectionId, mobile) => {
      const section = document.getElementById(sectionId);

      if (mobile){
        openLinks();
      }
  
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

</script>

<style>
@import "@/assets/css/inici.css";
</style>
