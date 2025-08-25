h1, .title, .customContainer, .parallax-content h1 {
  color: #fff !important;
}
<template>
  <div>
    <!-- 1. Hero Section (Attention) -->
    <div class="bannerT">
      <video autoplay loop muted playsinline>
        <source src="Images/banner2.mp4" type="video/mp4">
        <!-- Add more source elements for other video formats (e.g., WebM, Ogg) -->
        Your browser does not support the video tag.
      </video>
      <div class="sound-button" id="soundButton" @click="toggleMute">
        🔇
      </div>
      <div class="video-text">
        <div class="text-wrap animationLeft">
          <h1 class="banText"> AUTO STALLION </h1>
          <!-- <p class="banText">Driving Perfection, the German and Italian Way.</p>-->
          <h5 class="fansT">Luxury Mobile Car Detailing Delivered to You</h5>

        </div>
      </div>
    </div>
    <!-- BANNER END -->
    
    <!-- 2. Services Overview (Interest) -->
    <section>
      <h1 class="customContainer autoShow">Our Services</h1>
      <br>
      <div class="services-container">
        <div class="card-container">
                <!-- card 1 -->
                <article class="card-article autoShow">
                    <img src="https://www.flexippf.com/wp-content/uploads/2024/09/what-is-ppf-for-cars-6.webp" class="card-img" alt="">
                    <div class="card-overlay">
                        <div class="card-info">
                            <h3 class="card-title">PPF: Paint Protection Film</h3>
                            <span class="card-price"></span>
                        </div>
                        <router-link to="/ppf" class="card-btn">
                            View More <i class="fa-solid fa-arrow-right"></i>
                        </router-link>
                    </div>
                </article>

                <!-- card 2 -->
                <article class="card-article autoShow">
                    <img src="https://exfordrentacar.com/program/images/products/img4_16654873762.jpeg" class="card-img" alt="">
                    <div class="card-overlay">
                        <div class="card-info">
                            <h3 class="card-title">Interior Detailing</h3>
                            <span class="card-price"></span>
                        </div>
                        <router-link to="/interior" class="card-btn">
                            View More <i class="fa-solid fa-arrow-right"></i>
                        </router-link>
                    </div>
                </article> 

                <!-- card 3 -->
                <article class="card-article autoShow">
                    <img src="https://cdn.prod.website-files.com/646224c3c792b261740d7171/646f1ddf02eaff757e56bbc2_Dry%20Ice%20Benefits.webp" class="card-img" alt="">
                    <div class="card-overlay">
                        <div class="card-info">
                            <h3 class="card-title">Dry Ice Cleaning</h3>
                            <span class="card-price"></span>
                        </div>
                        <router-link to="/dry-ice" class="card-btn">
                            View More <i class="fa-solid fa-arrow-right"></i>
                        </router-link>
                    </div>
                </article>
                <!-- card 4 -->
                <article class="card-article autoShow">
                    <img src="https://www.lotusofdetroit.com/staticmedia/656de96fd8fbb704732cc1fd/70fb6b85ccec38f8828de2f1b2b2ee21.webp"
                        class="card-img" alt="">
                    <div class="card-overlay">
                        <div class="card-info">
                            <h3 class="card-title">Executive Package</h3>
                            <span class="card-price"></span>
                        </div>
                        <router-link to="/executive" class="card-btn">
                            View More <i class="fa-solid fa-arrow-right"></i>
                        </router-link>
                    </div>
                </article>
                <!-- card 5 -->
                <article class="card-article autoShow">
                    <img src="https://images.squarespace-cdn.com/content/v1/6371cc49cda4fd302dde5ccd/2bf63bf5-877a-4456-92d9-371dc54036b2/Koenigsegg+Lineup+by+Jon+Goldeng"
                        class="card-img" alt="">
                    <div class="card-overlay">
                        <div class="card-info">
                            <h3 class="card-title">Presidential Package</h3>
                            <span class="card-price"></span>
                        </div>
                        <router-link to="/presidential" class="card-btn">
                            View More <i class="fa-solid fa-arrow-right"></i>
                        </router-link>
                    </div>
                </article>
                <!-- card 6 -->
                <article class="card-article autoShow">
                    <img src="https://applescoop.org/image/wallpapers/iphone/rolls-royce-phantom-luxury-car-brand-28-09-2024-1727565701-hd-wallpaper.jpg"
                        class="card-img" alt="">
                    <div class="card-overlay">
                        <div class="card-info">
                            <h3 class="card-title">Signature Package</h3>
                            <span class="card-price"></span>
                        </div>
                        <router-link to="/signature" class="card-btn">
                            View More <i class="fa-solid fa-arrow-right"></i>
                        </router-link>
                    </div>
                </article>
        </div>
      </div>
    </section>
    
    <!-- 3. Social Proof & Trust Builders (Desire) -->
    <section>
      <h1 class="customContainer autoShow">Trusted by the World's Most Prestigious Automotive Brands</h1>

      <p class="customContainer autoShow" id="p-text">We're proud to have earned the trust of premium vehicle owners and luxury-focused companies who value
        perfection,
        discretion, and uncompromising quality. These trusted brands and clients reflect the high standards we deliver with
        every detail.</p>
      <div class="scroller autoShow" data-direction="left">
        <div class="tag-list scroller-inner">
          <div class="item"><img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="Brand 1"></div>
          <div class="item"><img src="https://1000logos.net/wp-content/uploads/2018/03/Lamborghini-Logo-1998.png" alt="Brand 2"></div>
          <div class="item"><img src="https://pngimg.com/d/rolls_royce_PNG34.png" alt="Brand 3"></div>
          <div class="item"><img src="https://cdn.freebiesupply.com/logos/large/2x/ferrari-ges-logo-png-transparent.png" alt="Brand 4"></div>
          <div class="item"><img src="https://logodix.com/logo/5502.png" alt="Brand 5"></div>
          <div class="item"><img src="https://logos-world.net/wp-content/uploads/2021/06/Porsche-Logo.png" alt="Brand 6"></div>
          <div class="item"><img src="https://www.premiumfelgi.com/public/assets/Opisy%20Producent%C3%B3w/1200px-Brabus_logo.svg.png" alt="Brand 7"></div>
          <div class="item"><img src="https://www.pngplay.com/wp-content/uploads/13/Maserati-Logo-Transparent-PNG.png" alt="Brand 8"></div>
          <div class="item"><img src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/42/Jaguar-logo-2012-1920x1080.png/1280px-Jaguar-logo-2012-1920x1080.png" alt="Brand 9"></div>
          <div class="item"><img src="https://cdn-ukwest.onetrust.com/logos/75d66024-cd85-4d16-b290-f14ad205c9d0/bddccdb3-c9fb-4dca-a315-dadca1ab8686/2edc77b2-89b0-46dd-8727-e4a0bc467d43/McLaren-Racing-NoTagline-Wht.png" alt="Brand 10"></div>
        </div>
      </div>
    </section>
    
    <section>
      <div class="stack-area">
        <div class="left">
          <div class="title">Why Choose Us?</div>
          <p class="sub-title">
            At Auto Stallion, we believe luxury isn't just about the car you drive — it's about the experience you enjoy.
            That's why we combine convenience, expertise, and eco-conscious care to give your vehicle the flawless finish it
            deserves, anytime, anywhere.
            <br />
            <button class="btn-banner">
              <router-link to="/about" class="btn-link" style="--i:1;">See More Details</router-link>
            </button>
          </p>
        </div>
        <div class="right">
          <div class="imgCard" id="card1">
            <div class="sub">Mobile Convenience</div>
            <p class="content">We come to you, saving time and hassle.</p>
          </div>
          <div class="imgCard" id="card2">
            <div class="sub">Luxury-Grade Products</div>
            <p class="content">Premium, eco-friendly products for lasting shine.</p>
          </div>
          <div class="imgCard" id="card3">
            <div class="sub">Eco-Conscious Products</div>
            <p class="content">Premium detailing using safe, eco-friendly solutions.</p>
          </div>
          <div class="imgCard" id="card4">
            <div class="sub">Certified Detailing Experts</div>
            <p class="content">Trained professionals specializing in luxury cars.</p>
          </div>
          <div class="imgCard" id="card5">
            <div class="sub">Attention to Detail</div>
            <p class="content">Every inch perfected for showroom-quality results.</p>
          </div>
        </div>
      </div>
    </section>

        <!-- 5. How It Works (Clarity Before Action) -->
     <section id="how-it-works">
        <h1 class="customContainer autoShow">How it works</h1>
        <div class="container-five text-center">
            <div class="row gap-4 justify-content-center">
                <div class="col-sm how-card autoShow">
                    <i class="bi bi-calendar-check"></i>
                    <h5>Book Your Appointment</h5>
                    <!-- <p>Select your service package and schedule online in less than 2 minutes</p> -->
                </div>
                <div class="col-sm how-card autoShow">
                    <i class="bi bi-geo-alt-fill"></i>
                    <h5>We Come to You</h5>
                    <!-- <p>Select your service package and schedule online in less than 2 minutes</p> -->
                </div>
                <div class="col-sm how-card autoShow">
                    <i class="bi bi-stars"></i>
                    <h5>Luxury Detailing</h5>
                    <!-- <p>Select your service package and schedule online in less than 2 minutes</p> -->
                </div>
                <div class="col-sm how-card autoShow">
                    <i class="bi bi-car-front-fill"></i>
                    <h5>Drive In Style</h5>
                    <!-- <p>Select your service package and schedule online in less than 2 minutes</p> -->
                </div>
            </div>
        </div>
     </section>
    
    <section>
        <div class="parallax-header1">
            <div class="parallax-container">
                <div class="parallax-content animationLeft">
                    <h1 class="animate">Book Your Comprehensive service Today</h1>
                    <p class="animate">Keeping your vehicle in better than showroom condition with expert techniques for exterior & interior. Maintain your
                    vehicle's highest level of beauty.</p>
                             <button class="btn-banner">
                    <router-link to="/packages" class="btn-link" style="--i:1;">Explore Services</router-link>
          </button>
                </div>
            </div>
        </div>
    </section>
    <!-- Global AppFooter is now used via App.vue -->
  </div>
</template>

<script>
export default {
  name: 'AutoStallion',
  data() {
    return {
  isLoggedIn: !!localStorage.getItem('user')
    }
  },
  mounted() {
    this.initAnimations();
    this.initCardRotation();
    this.initScroller();
    window.addEventListener('storage', this.syncLoginState);
    window.addEventListener('user-logged-in', this.syncLoginState);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncLoginState);
    window.removeEventListener('user-logged-in', this.syncLoginState);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncLoginState);
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.isLoggedIn = false;
      this.$router.push('/');
    },
    syncLoginState() {
      this.isLoggedIn = !!localStorage.getItem('user');
    },
    toggleMute() {
      const video = document.querySelector('video');
      const soundButton = document.getElementById('soundButton');
      if (video.muted) {
        video.muted = false;
        soundButton.textContent = '🔊';
      } else {
        video.muted = true;
        soundButton.textContent = '🔇';
      }
    },
    initAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        })
      }, {})
      const animateElements = document.querySelectorAll('.animate')
      animateElements.forEach(el => observer.observe(el));
    },
    initCardRotation() {
      let cards = document.querySelectorAll(".imgCard");
      let stackArea = document.querySelector(".stack-area");

      function rotateCards() {
        let angle = 0;
        cards.forEach((card, index) => {
          if (card.classList.contains("away")) {
            card.style.transform = `translateY(-120vh) rotate(-48deg)`;
          } else {
            card.style.transform = ` rotate(${angle}deg)`;
            angle = angle - 10;
            card.style.zIndex = cards.length - index;
          }
        });
      }

      rotateCards();

      window.addEventListener("scroll", () => {
        let distance = window.innerHeight * 0.5;
        let topVal = stackArea.getBoundingClientRect().top;
        let index = -1 * (topVal / distance + 1);
        index = Math.floor(index);

        for (let i = 0; i < cards.length; i++) {
          if (i <= index) {
            cards[i].classList.add("away");
          } else {
            cards[i].classList.remove("away");
          }
        }
        rotateCards();
      });
    },
    initScroller() {
      const scrollers = document.querySelectorAll('.scroller');

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        this.addAnimation();
      }
    },
    addAnimation() {
      const scrollers = document.querySelectorAll('.scroller');
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller-inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        })
      });
    }
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Playfair Display", serif;
}

body{
    background: #100f0f !important;
    color: #ffffff !important;
}

.container{
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
}

.test{
    border: #fff solid 5px;
}

section{
    padding-top: 2rem;
    padding-bottom: 2rem;
}

h1{
    font-family: "Playfair Display", serif;
    color: #fff;
}

p{
    font-family: "Lato", sans-serif !important;
    font-weight: 400 !important;
    font-style: normal !important;
    color: #fff;
}

.autoShow{
    animation: text-appear both;
    animation-timeline: view();
    animation-range: entry 20% cover 100vh;
}

@keyframes text-appear{
    from{
        opacity: 0;
        transform: translateY(100px);
    }
    to{
        opacity: 1;
        transform: translateY(0) ;
    }
}

.imageReveal{
    animation: imageReveal both;
    animation-timeline: view(10% 5%);
}

@keyframes text-appear{
    from{
        opacity: 0;
        transform: translateY(100px);
    }
    to{
        opacity: 1;
        transform: translateY(0) ;
    }
}

.imageReveal{
    animation: imageReveal both;
    animation-timeline: view(10% 5%);
}

@keyframes imageReveal{
    from{
        filter: saturate(0) contrast(4) brightness(.1) blur(5px);
        opacity: 0;
        scale: .95;
        translate: 0 4rem;
    }
    to{
        filter: none;
        opacity: 1;
        scale: 1;
        translate: 0 0;
    }
}

.fadeUp{
    animation: fadeUp both;
    animation-timeline: view();
}


@keyframes fadeUp {
    from{
        opacity: 0;
        transform: translateY(10px) scale(0.5);
    }
    to{
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.autoBlur{
    animation: autoBlurAnimation linear both;
    animation-timeline: view(50% auto);
}

@keyframes autoBlurAnimation {
    0%{
        filter: blur(20px);
    }
    35%, 45% {
        filter: blur(0px);
    }
    70% {
        filter: blur(20px);
    }
    100% {
        filter: blur(0px);
    }
}


.animate {
    opacity: 0;
    transform: translateY(50%);
    transition: all 0.7s ease;
}

.animate.show {
    opacity: 1;
    transform: translateY(0);
}

/* Header and Navbar */
header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.9rem 10%;
    /* background: rgba(0, 0, 0, .1);
    backdrop-filter: blur(50px); */
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    color: #fff;
}

header::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: skyblue;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .1);
    backdrop-filter: blur(50px);
    z-index: -1;
}

.logo{
    font-size: 2rem;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
}

.navigation a{
    font-size: 1.22rem;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 2.5rem;
}

.navigation .active{
    color: #c1902d;
    font-family: 950;
}

#check{
    display: none;
}

.icons{
    position: absolute;
    right: 5%;
    font-size: 2.8rem;
    color: #fff;
    cursor: pointer;
    display:none;
}

.nav-links{
    position: relative;
    color: #c1902d;
    font-weight: 900;
}

.nav-links::after{
    content: '';
    width: 0;
    height: 2px;
    background-color: #c1902d;
    position: absolute;
    left: 0;
    bottom: -.6rem;
    transition: width .4s;
}

.nav-links:hover::after{
    width: 60%;
}

/* Responsive Design */
@media (max-width: 992px) {
    .header{
        padding: 1.3rem 5%;
    }
}

@media (max-width: 768px) {
    .icons {
        display: inline-flex;
        font-size: 1.8rem;
    }

    #check:checked~.icons #menu-icon {
        display: none;
    }

    #check:checked~.icons #close-icon {
        display: block;
    }

    .icons #close-icon {
        display: none;
    }
    .navigation {
        position: absolute;
        top: 100%;
        left: 0;
        height: 0;
        width: 100%;
        background: rgba(0, 0, 0, .1);
        backdrop-filter: blur(50px);
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
        transition: .3s ease;
        overflow: hidden;
    }

    #check:checked~.navigation {
        height: 17.7rem;
    }

    .navigation a {
        display: block;
        font-size: 1.1rem;
        text-align: center;
        margin: 1.5rem 0;
        transform: translateY(-50px);
        transition: .3s ease;
        opacity: 0;
    }

    #check:checked~.navigation a {
        transform: translateY(0);
        transition-delay: calc(.15s * var(--i));
        opacity: 1;
    }
}

section .hero img{
    position: relative;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
}

video {
    width: 100%;
    height: auto;
    display: block;
}

.bannerT {
    color: white;
    min-height: 300px;
    text-align: left;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: left;
    box-sizing: border-box;
}

.bannerT img {
    max-width: 100%;
    height: auto;
}

.video-text {
    position: absolute;
    top: 10%;
    left: 20%;
    transform: translate(-20%, -20%);
    /*background: rgba(0, 0, 0, 0.5);*/
    /*color: #fff; /* Text color */
    padding: 10px;
    color: #fff;
}

.sound-button {
    width: 20px;
    position: absolute;
    bottom: 10px;
    right: 30px;
    color: #fff;
    padding: 5px 10px;
    cursor: pointer;
    z-index: 2;
}

.text-wrap {
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    margin-top: 200px;
    font-size: 1.2rem;
    line-height: 1.6;
    word-wrap: break-word;
}

.banText {
    font-size: 50px;
    margin: 0;
}

.fansT {
    font-size: 35px;
    margin: 0px 0;
}

@media screen and (max-width: 768px) {
    .banText {
        font-size: 24px;
    }

    .fansT {
        font-size: 16px;
    }
    .text-wrap {
        margin-top: 120px;
    }
}

.animationLeft{
    animation: sideLeft 1.6s ease forwards;
    opacity: 0;
    animation-delay: 1s;
}

@keyframes sideLeft {
    from {
        transform: translateX(-100px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
}

.animationRight {
    animation: sideRight 0.5s ease forwards;
    opacity: 0;
    animation-delay: 1s;
}

@keyframes sideRight {
    from {
        transform: translateX(100px);
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
}

.btn-banner{
    background: rgba(193, 144, 45, .8);
    color: #fff;
    padding: 12px 17px;
    border: none;
    border-radius: 11px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 24px;
    transition: background-color 0.3s ease;
    /* background: rgba(0, 0, 0, .1); */
    backdrop-filter: blur(50px);
    font-weight: 700;
}

.btn-banner:hover{
    box-shadow: 0 2px 5px rgba(193, 144, 45, .8);
    background: rgba(193, 144, 45, .1);
    transform: scale(1.01);
    cursor: pointer;
}


button .btn-link,
button .router-link {
  text-decoration: none !important;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  border: none;
}

/* Banner end */

.customContainer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

@keyframes appear {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}

.customContainer{
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

:root {
    --track-height: 130px;
    --item-width: 200px;
    --gap: 17px;
    --scroll-duration: 30s;
}

h1{
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
}

p{
    font-size: 1.1rem;
    color: #fff;

}

#p-text{
    width: 800px;
    color: #fff;
}

/* container */
.wrapper {
    width: 100%;
    max-width: 1800px;
    /* margin: 1rem auto; */
    height: var(--track-height);
    overflow: hidden;
    position: relative;
    /* border: 1px solid rgba(255, 255, 255, 0.12); */
    background: transparent;
    animation: scroll-wrapper;
}

.track {
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: var(--gap);
    will-change: transform;
    animation: scroll-left var(--scroll-duration) linear infinite;
    -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
    mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.item {
    flex: 0 0 var(--item-width);
    height: calc(var(--track-height) - 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: transparent;
    /* background-color: aqua; */
}

.item img {
    max-width: 100%;
    max-height: 80%;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.85;
    transition: filter .25s, opacity .25s;
}

.item:hover img {
    filter: none;
    opacity: 1;
}


/* animation */
@keyframes scroll-left {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@keyframes scroll-wrapper {
    0% {
        transform: translateX(0);
        opacity: 0.2;
    }

    100% {
        transform: translateX(-50%);
        opacity: 0.1;
    }
}

.wrapper:hover .track {
    animation-play-state: paused;
}

@media (max-width: 600px) {
    :root {
        --item-width: 140px;
        --gap: 16px;
        --scroll-duration: 25s;
    }
}

/* Section 2 Content */
.stack-area {
    width: 100%;
    height: 300vh;
    position: relative;
    display: flex;
}

.left {
    height: 100vh;
    flex-basis: 50%;
    position: sticky;
    top: 0;
    left: 0;
}

.right {
    height: 100vh;
    flex-basis: 50%;
    position: sticky;
    top: 0;
}

.left {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
}

.title {
    width: 420px;
    font-size: 55px;
    font-weight: 700;
    line-height: 88px;
}

.sub-title {
    width: 420px;
    font-size: 18px;
    margin-top: 15px;
}

/* .sub-title button {
    font-size: 14px;
    padding: 15px 30px;
    background: #c1902d;
    color: white;
    border-radius: 8mm;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 30px;
} */

#why-choose-us{
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
}

.imgCard {
    width: 350px;
    height: 400px;
    border-radius: 25px;
    margin-bottom: 10px;
    position: absolute;
    top: calc(50% - 175px);
    left: calc(50% - 175px);
    transition: 0.5s ease-in-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 25px;
    color: white;
    overflow: hidden;
}

.imgCard::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7));
    z-index: 0;
}

.imgCard:nth-child(1) {
    background-color: #100f0f;
    box-shadow: 0 2px 6px rgba(193, 144, 45, 1);
}

.imgCard:nth-child(2) {
    background-color: #100f0f;
    box-shadow: 0 2px 6px rgba(193, 144, 45, 1);
}

.imgCard:nth-child(3) {
    background-color: #100f0f;
    box-shadow: 0 2px 6px rgba(193, 144, 45, 1);
}

.imgCard:nth-child(4) {
    background-color: #100f0f;
    box-shadow: 0 2px 6px rgba(193, 144, 45, 1);
}

.imgCard:nth-child(5) {
    background-color: #100f0f;
    box-shadow: 0 2px 6px rgba(193, 144, 45, 1);
}

#card1 {
    background-image: url("https://ocdsingapore.com/assets/images/ExteriorDetailing.webp");
}

#card2 {
    background-image: url("https://cdn.shopify.com/s/files/1/0797/2968/8869/files/BzigzuCTgh9bgWWqG0nkrstfK0IJNJXNZP54ChXO.png?v=1737641509&width=1620&height=1080");
}

#card3 {
    background-image: url("https://www.autofinesse.com/cdn/shop/files/Citrus-Power-5L-Square.jpg?v=1742296153");
}

#card4 {
    background-image: url("https://cardetailingsdetroit.com/wp-content/uploads/2024/12/Expert_Technicians__Our_trained_and_experienced_team_uses_the_latest_equipment_and_eco-friendly_products_to_provide_high-quality_results_for_car_detailing__-1024x1024.webp");
}

#card5 {
    background-image: url("https://popularcarwashdetailing.com/wp-content/uploads/2024/01/Treating-High-End-Vehicles-with-Care.jpg");
}

.imgCard {
    box-sizing: border-box;
    padding: 35px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.sub,
.content {
    position: relative;
    z-index: 1;
}

.sub {
    font-size: 29px;
    font-weight: 700;
  color: #fff;
    text-align: center;
}

.content {
    font-size: 20px;
    font-weight: 500;
  color: #fff;
    text-align: center;
}

.away {
    transform-origin: bottom left;
}

/* Scroller */
.tag-list{
    margin: 0;
    padding-inline: 0;
    list-style: none;
}

.tag-list li {
    padding: 1rem;
    background: var(--clr-primary-400);
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.1);
}

.scroller{
    max-width: 900px;
    margin: auto;
}

.scroller-inner{
    padding-block: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

.scroller[data-animated="true"] {
    /* border: 5px solid magenta; */
    overflow: hidden;
    -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
    mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller-inner {
    width: max-content;
    flex-wrap: nowrap;
    animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction="right"]{
    --_animation-direction: reverse;
}

.scroller[data-direction="left"] {
    --_animation-direction: forwards;
}

@keyframes scroll{
    to {
        transform: translate(calc(-50% - 0.5rem));
      }
}

/* PARALAX */
.parallax-header1 {
    background: #000;
  /* background-image: url(/Images/parallax.jpeg); */
  /* background-image: url('Images/bmwpic.jpg'); */
  background-image: url('~@/assets/bmwpic.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.parallax-content {
    padding: 100px 0 250px 0;
    text-align: left;
}

.parallax-content h1{
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 2rem;
}

.parallax-content p {
    font-size: 1.2 rem;
}

.parallax-container{
    width: 700px;
    text-align: left;
    margin-left: 100px;
}

.dashboard-content {
    width: 250px !important;
    box-shadow: 0 2px 5px rgb(155, 89, 182, 0.4);
    border-radius: 15px;
}

.dashboard-content i {
    font-size: 1.6rem;
}

.dashboard-content p {
    font-weight: 600;
}

.dashboard-content:hover {
    box-shadow: 0 2px 5px rgb(155, 89, 182, 0.8);
    transform: scale(1.01);
    cursor: pointer;
}

.service-card {
    box-shadow: 0 2px 5px rgba(193, 144, 45, 0.4);
    border-radius: 15px;
}

.service-card:hover {
    box-shadow: 0 2px 5px rgba(193, 144, 45, 0.9);
    transition: ease-in-out 0.5s;
    cursor: pointer;
}
.services-container {
    display: grid;
    justify-content: center !important;
    width: 80%;
    margin: auto;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    justify-content: center !important;
}

.card-article {
    position: relative;
    box-shadow: 0 2px 6px rgba(193, 144, 45, 0.9);
    display: grid;
    row-gap: 1rem;
    overflow: hidden;
    transition: background-color 0.6s;
    border-radius: 10px;
}

.card-img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    z-index: 1;
    display: block;
    filter: drop-shadow(0 8px 24px hsla(170, 12%, 8%, 0.1));
    transition: transform 0.4s;
    border-radius: 10px 10px 0 0;
    filter: grayscale(100%);
    transition: all .6s ease-in-out;
}

.card-info {
    position: absolute;
    bottom: 0;
    /* left: 0;
    background: rgba(0, 0, 0, 0.5); */
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    transition: transform 0.4s, opacity 0.4s;
    padding: 0.75rem;
    color: white;
    text-align: center;
}

.card-title {
    font-size: medium;
    font-weight: 500;
    z-index: 3;
    font-size: 1.4rem;
}

.card-btn {
    background-color: #c1902d;
    padding: 0.7rem .9rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 8px 24px rgba(193, 144, 45, 0.1);
    position: absolute;
    bottom: -0.1rem;
    opacity: 0;
    pointer-events: none;
    transition: transform 0.4s, opacity 0.4s;
    border-radius: 6px;
    z-index: 3;
    text-decoration: none;
    font-weight: 800;
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(transparent, black);
    z-index: 2;
    cursor: pointer;
}

.card-btn i {
    font-size: 1.25rem;
    transition: transform 0.4s;
}

.card-btn:hover i {
    transform: translateX(5px);
}

.card-article:hover .card-img {
    transform: scale(1.1);
    filter: grayscale(0%);
    transition: all .6s ease-in-out;
    cursor: pointer;
}

.card-article:hover .card-info {
    transform: translateY(-4.5rem);
    opacity: 0;
}

.card-article:hover {
    background-color: transparent;
}

.card-article:hover .card-bg {
    transform: scale(1);
}

.card-article:hover .card-btn {
    transform: translateY(-3.75rem);
    opacity: 1;
    pointer-events: initial;
}

@media screen and (max-width: 300px) {
    .services-container {
        margin-inline: 1rem;
    }

    .card-container {
        grid-template-columns: 1fr;
    }
}

@media screen and (min-width: 1120px) {
    .services-container {
        display: grid;
        align-items: center;
    }

    .card-img {
        height: 250px;
    }
}

@media (min-width: 992px) {
    .card-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

.container-five{
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.how-card{
    max-width: 320px !important;
    /* border: 4px solid #c1902d; */
    border-radius: 10px;
    text-align: center;
}

.how-card i{
    font-size: 3.1rem;
    color: #ffffff;
    padding: 18px;
}

#how-it-works{
    padding-top: 0rem !important;
    padding-bottom: 3rem !important;
}


#how-it-works h1{
    font-size: 3rem;
    /* font-weight: 700; */
}



#footer{
    background: linear-gradient(transparent, #0a0a0a);
    /* background: linear-gradient(to top, #0c0b0b, #100f0f, #0a0a0a); */
    color: #e0e0e0;
}

#footer-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 300px;
}
/* Force all headings and section text to white */
h1, h2, h3, h4, h5, h6,
.title,
.customContainer,
.parallax-content h1,
.sub-title,
.parallax-content p {
  color: #fff !important;
}
</style>