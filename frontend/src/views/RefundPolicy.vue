<template>
  <!-- Global AppNavbar is now used via App.vue -->
    <div class="privacy-page">
      <div class="privacy-container">
        <div class="brand-section">
          <h1 class="brand-tagline">Return & Refund Policy</h1>
        </div>

        <div class="privacy-content">
          <hr>
          <div class="privacy-section">
            <p>Thank you for choosing Auto Stallion for your car detailing needs. We take pride in providing premium mobile detailing services and stand behind our work. Please review our policy below regarding service satisfaction, refunds, and cancellations.</p>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Satisfaction Guarantee</h3>
            <p>At Auto Stallion, we are committed to delivering exceptional service. If you are not completely satisfied with your detailing service, please contact us within 24 hours of service completion. We will work with you to address any concerns and, if necessary, re-perform the unsatisfactory aspects of the service at no additional cost.</p>
            <div style="background-color: rgba(193, 144, 45, 0.1); border-left: 4px solid #C1902D; padding: 15px 20px; margin: 20px 0; border-radius: 4px;">
              <p><strong>Important:</strong> All services must be evaluated immediately upon completion. Claims regarding service quality must be made before the vehicle is used or exposed to environmental elements.</p>
            </div>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Cancellation Policy</h3>
            <p>We understand that plans change. If you need to cancel or reschedule your appointment, please notify us at least 24 hours in advance. Cancellations made with less than 24 hours notice may be subject to a cancellation fee of 50% of the scheduled service cost.</p>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Refund Eligibility</h3>
            <p>Refunds are considered on a case-by-case basis under the following circumstances:</p>
            <ul>
              <li>Service not performed as booked</li>
              <li>Damage to vehicle caused by our technicians (must be reported within 24 hours)</li>
              <li>Service canceled by Auto Stallion due to unforeseen circumstances</li>
            </ul>
            <p>Refunds are processed to the original payment method within 7-10 business days of approval.</p>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Non-Refundable Services</h3>
            <p>The following services and situations are not eligible for refunds:</p>
            <ul>
              <li>Services already performed to satisfaction</li>
              <li>Change of mind after service completion</li>
              <li>Pre-existing vehicle conditions not addressed during booking consultation</li>
              <li>Minor imperfections in vehicles with existing paint or interior damage</li>
              <li>Ceramic coatings and paint protection films after application (unless defective)</li>
              <li>Subscription packages after first service has been performed</li>
            </ul>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Weather-Related Cancellations</h3>
            <p>For the best results, certain detailing services require specific weather conditions. We reserve the right to reschedule services if weather conditions are not optimal. In such cases, we will contact you to reschedule at no additional charge.</p>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Defective Products</h3>
            <p>If you believe a product we've applied (such as ceramic coating, paint protection film, or leather treatment) is defective, please contact us immediately. We will arrange for an inspection of your vehicle. Valid claims will result in re-application of the product or a partial refund based on the expected lifespan of the product.</p>
            <div style="background-color: rgba(193, 144, 45, 0.1); border-left: 4px solid #C1902D; padding: 15px 20px; margin: 20px 0; border-radius: 4px;">
              <p><strong>Note:</strong> The lifespan of any protective product depends on environmental conditions, vehicle usage, and maintenance practices. Products damaged by improper care or accidents are not covered under our warranty.</p>
            </div>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">How to Request a Refund or Reschedule</h3>
            <p>To request a refund, reschedule, or report an issue with your service:</p>
            <ol>
              <li>Contact us within 24 hours of service completion</li>
              <li>Provide your booking reference number</li>
              <li>Describe the issue in detail</li>
              <li>Provide photos if applicable</li>
            </ol>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Warranty on Services</h3>
            <p>Some of our premium services include warranties:</p>
            <ul>
              <li><strong>Ceramic Coatings:</strong> 1-3 years depending on package (requires proper maintenance)</li>
              <li><strong>Paint Protection Film:</strong> 5 years against yellowing and cracking</li>
              <li><strong>Leather Treatment:</strong> 6 months against premature wear</li>
            </ul>
            <p>Warranty claims require proof of proper maintenance and may involve inspection by our technicians.</p>
          </div>

          <hr>
          <div class="privacy-section">
            <h3 class="section-title">Contact Information</h3>
            <p>For questions about our return policy or to initiate a refund request:</p>
            <p>Email: <a href="mailto:admin@autostallion.com">admin@autostallion.com</a></p>
            <p>Phone: +27 21 123 4567</p>
            <p>Business Hours: Monday-Friday, 8:00 AM - 5:00 PM</p>
          </div>

          <hr>
         
        </div>
      </div>
    </div>


<!-- Global AppFooter is now used via App.vue -->
</template>

<style scoped>
.privacy-page {
margin-top: 100px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-family: "Playfair Display", serif;
  color: #ffffff;
}

.privacy-container {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  background: rgba(15, 15, 15, 0.7);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.brand-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
}

.brand-tagline {
  color: #C1902D;
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.privacy-content {
  padding: 2rem;
  line-height: 1.6;
}

.privacy-section {
  margin-bottom: 2rem;
}

.section-title {
  color: #C1902D;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

a {
  color: #C1902D;
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #fff;
  text-decoration: underline;
}

li{
    text-align: left;
}

@media (max-width: 768px) {
  .privacy-container {
    margin: 1rem;
  }

  .brand-section {
    padding: 1.5rem;
  }

  .privacy-content {
    padding: 1.5rem;
  }

  .brand-tagline {
    font-size: 1.4rem;
  }

  .section-title {
    font-size: 1.2rem;
  }
}
</style>
