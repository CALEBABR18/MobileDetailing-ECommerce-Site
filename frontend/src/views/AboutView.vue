<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Driven by Passion. Defined by Excellence.</h1>
        <p>Luxury Car Detailing & Paint Protection | Mobile & Studio Service</p>
      </div>
    </div>

    <!-- Our Story -->
    <div class="story-section">
      <div class="story-content">
        <h2>Our Story</h2>
        <div class="story-grid">
          <div class="story-text">
            <p>Founded by car enthusiasts, Auto Stallion began as a dream to bring world-class detailing to every driveway. From humble beginnings, we've grown into a trusted name for luxury owners, collectors, and dealerships. Our journey is fueled by a relentless pursuit of perfection and a love for the art of automotive care.</p>
            <div class="signature">
              <!-- <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80&facepad=2.5" alt="Founder portrait"> -->
              <div>
                <p>"Every car tells a story. We make sure it's a masterpiece."</p>
                <span>- The Auto Stallion Team</span>
              </div>
            </div>
          </div>
          <div class="story-image">
            <img src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80" alt="Auto Stallion team at work">
          </div>
        </div>
      </div>
    </div>

    <!-- Philosophy Section -->
    <div class="philosophy-section">
      <h2>Our Philosophy</h2>
      <div class="philosophy-grid">
        <div class="philosophy-card">
          <div class="icon">🛡️</div>
          <h3>Protection First</h3>
          <p>We use only the best ceramic coatings, PPF, and eco-friendly products to ensure your vehicle is protected for years to come.</p>
        </div>
        <div class="philosophy-card">
          <div class="icon">✨</div>
          <h3>Attention to Detail</h3>
          <p>Every inch matters. Our team is trained to deliver flawless results, inside and out, for every car and every client.</p>
        </div>
        <div class="philosophy-card">
          <div class="icon">🚗</div>
          <h3>Convenience & Care</h3>
          <p>Mobile or studio, we work around your schedule. Enjoy luxury service at your home, office, or in our state-of-the-art studio.</p>
        </div>
      </div>
    </div>

    <!-- Studio Section -->
    <div class="studio-section">
      <div class="studio-overlay"></div>
      <div class="studio-content">
        <h2>Visit Our Studio</h2>
        <p>Experience the ultimate in automotive care at our flagship studio. From climate-controlled bays to advanced paint correction, we offer the best environment for your prized vehicle.</p>
        <ul class="points">
          <p>Climate-controlled detailing bays</p>
          <p>Paint correction & ceramic coating specialists</p>
          <p>Comfortable client lounge with WiFi</p>
          <p>Secure, insured facility</p> 
        </ul>
      </div>
    </div>

    <!-- Team Section -->
    <div class="team-section">
      <h2>Meet the Team</h2>
      <div class="team-grid">
        <div class="team-member">
          <img src="https://carcareful.peacefulqode.in/wp-content/uploads/2024/01/testimonial-01.jpg" alt="Lead Detailer">
          <h4>Harvey Specter</h4>
          <p>Lead Detailer & Paint Correction Specialist</p>
        </div>
        <div class="team-member">
          <img src="https://808autodetail.com/wp-content/uploads/2024/08/31.jpg" alt="PPF Expert">
          <h4>Sam Sulek</h4>
          <p>PPF & Ceramic Coating Expert</p>
        </div>
        <div class="team-member">
          <img src="https://img.freepik.com/premium-photo/portrait-young-woman-professional-female-mechanic-smiling-camera-standing-auto-repair-shop-car-service-repair-maintenance-people-concept_1429-25663.jpg" alt="Mobile Specialist">
          <h4>Megan Jay</h4>
          <p>Mobile Detailing Specialist</p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <h2>Ready to Experience the Difference?</h2>
      <p>Book your luxury detailing or protection service today. Discover why Auto Stallion is trusted by car lovers and collectors across the region.</p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  font-family: 'Helvetica Now', sans-serif;
  color: #333;
}

.hero-section {
  height: 80vh;
  background: url('https://wallpapercave.com/wp/wp15356628.jpg') center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-logo {
  max-width: 300px;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 15px rgba(255,215,0,0.5));
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 3px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.hero-content p {
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: #FFD700;
}

.story-section {
  padding: 100px 20px;
  background: #000000;
}

.story-content {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
}

.story-content h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 60px;
  color: #ffffff;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.story-text p {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: #ffffff;
  margin-right: 40px;
  
}

/* .signature {
  display: flex;
  align-items: center;
  margin-top: 40px;
}

.signature img {
  max-width: 150px;
  margin-right: 20px;
}

.signature p {
  font-style: italic;
  margin: 0;
  line-height: 1.4;
}

.signature span {
  font-size: 0.9rem;
  color: #888;
} */

.story-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  margin-left: 50px;
}

.philosophy-section {
  padding: 100px 20px;
  background: #111;
  color: white;
  text-align: center;
}

.philosophy-section h2 {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 60px;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.philosophy-card {
  padding: 40px 30px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  transition: all 0.3s;
}

.philosophy-card:hover {
  transform: translateY(-10px);
  background: rgba(255,215,0,0.05);
}

.philosophy-card .icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #FFD700;
}

.philosophy-card h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #FFD700;
}

.philosophy-card p {
  line-height: 1.6;
  color: #ccc;
}

.studio-section {
  height: 600px;
  background: url('https://www.rupes.com/wp-content/uploads/2022/12/dsc00054-2-scaled.jpg') center/cover;
  position: relative;
  display: flex;
  align-items: center;
}

.studio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
}

.studio-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 700px;
  padding: 0 40px;
}

.studio-content h2 {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.studio-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.points p {
  margin: 0;
  padding: 5px 0;
}

.tour-button {
  background: transparent;
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 15px 30px;
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
}

.tour-button:hover {
  background: rgba(255,215,0,0.1);
}


@media (max-width: 768px) {
  .story-grid {
    grid-template-columns: 1fr;
  }
  
  .philosophy-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
}
</style>