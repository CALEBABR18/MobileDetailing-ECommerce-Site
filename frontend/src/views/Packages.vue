<template>
  <!-- <div class="luxury-packages">
    <div class="package-header">
      <h2>AutoStallion Detailing Services</h2>
      <p>Auto Stallion has designed a complete system of tools and accessories that allow professional automotive
        detailers to achive perfection more effectively and efficiently. Swipe to explore our detailing packages</p>
    </div>
</div> -->


    <div class="bannerT bg-image">
      <div class="video-text">
        <div class="text-wrap animationLeft">
          <h1 class="banText"></h1>
          <h5 class="fansT">Auto Stallion has designed a complete system of tools and accessories that allow professional automotive
        detailers to achive perfection more effectively and efficiently. Swipe to explore our detailing packages</h5>
        </div>
      </div>
    </div>

 <!-- 2. Services Overview (Interest) -->
    <section>
      <h1 class="customContainer autoShow"><h2>Our Services</h2></h1>
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
  </template>

<script setup>
const zoomOutCircle = (event) => {
  event.currentTarget.style.transform = 'translateY(-20px) scale(0.90)';
};

const resetCircle = (event) => {
  event.currentTarget.style.transform = 'translateY(-20px) scale(1)';
};
</script>

<style scoped>
.luxury-packages {
  background-color: #000;
  padding: 20px 20px;
  font-family: "Playfair Display", serif;
}

/* Steps Container */
.package-card {
  min-width: 380px;
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  scroll-snap-align: start;
  border-radius: 12px;
  flex-shrink: 0;
  transition: 
    all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.5s ease,
    box-shadow 0.5s ease,
    background-size 0.5s ease;
  transform-origin: center center;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.package-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.70) 50%, rgba(0, 0, 0, 0.80) 100%);
  opacity: 0.9;
  transition: opacity 0.5s ease;
}

.package-card:hover::before {
  opacity: 0.5;
}

.package-card .package-content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 30px;
  color: white;
  width: 100%;
  transform: translateY(0);
  transition: transform 0.5s ease;
}

.package-card:hover .package-content {
  transform: translateY(-10px);
}

/* Image Zoom Effect */
.package-card {
  background-size: 105%;
  transition: background-size 0.5s ease;
}

.package-card:hover {
  background-size: 110%;
}

.package-header {
  text-align: center;
  margin-bottom: 30px;
}

.package-header h2 {
  color: #C1902D;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 1.7rem;
}

.package-header p {
  color: #aaa;
  font-size: 0.9rem;
}

.swipe-container {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 15px 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.cta-circle:hover {
  transform: scale(1.15);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  border: 1px solid #C1902D;
.package-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
  border-radius: 12px;
}
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  border-radius: 12px;
}

.package-content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 30px;
  width: 100%;
  color: white;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.cta-circle {
  background: transparent;
  border: 1px solid #C1902D;
  color: #C1902D;
  font-size: 0.9rem;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all 0.3s;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  font-family: "Playfair Display", serif;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
  transition: all 0.3s ease;
  touch-action: manipulation;
  margin-left: 8vw;
  margin-bottom: 8vw;
}

@media (max-width: 600px) {
  .cta-circle {
    width: 80px;
    height: 80px;
    margin-left: 0;
    margin-bottom: 4vw;
    font-size: 0.8rem;
  }
}

.package-footer {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #C1902D;
  font-size: 1.1rem;
  font-weight: 200;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.featured {
  border: 2px solid #C1902D;
}

/* Hide scrollbar but keep functionality */
.swipe-container::-webkit-scrollbar {
  display: none;
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
    /* font-size: 50px;
    margin: 0; */
  font-weight: 650;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}

.fansT {
    /* font-size: 35px;
    margin: 0px 0; */
  font-weight: 400;
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale; 
}

  .bg-image {
  background-image: url('https://wallpapercave.com/wp/wp15190628.webp');
  background-size: cover;
  background-position: center;
   background-attachment: fixed; 
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
}   
</style>