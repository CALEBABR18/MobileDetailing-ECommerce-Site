<template>
  <!-- Global AppNavbar is now used via App.vue -->
  <div class="privacy-page">
    <div class="privacy-container">
      <div class="brand-section">
        <h1 class="brand-tagline">Privacy Policy</h1>
      </div>
      
      <div class="privacy-content">
        <hr>
        <div class="privacy-section">
          <h3 class="section-title">Introduction</h3>
          <p>Auto Stallion Detailing Emporium ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
        </div>
        <hr>
        <div class="privacy-section">
          <h3 class="section-title">Personal Information We Collect</h3>
          <p>When you visit the Site, we automatically collect certain information about your device, including information about your web broswer, IP address ,time zone and some of the cookies that are installed on the device.Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p>
          <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect the following information refer to as “Order Information”.</p>
            <strong>Personal Information:</strong> Name, email, phone number, vehicle details, and payment information when you book our services.
            <strong>Technical Data:</strong> IP address, browser type, device information, and usage data through cookies.
            <strong>Service Records:</strong> Details of services performed, before/after photos (with consent), and vehicle condition reports.
          <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
        </div>
        <hr>
        <div class="privacy-section">
          <h3 class="section-title">How do we use your information?</h3>
          <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
          <ul class="privacy-list">
            - Provide and manage our detailing services
            - Process transactions and send service confirmations
            - Communicate about appointments and promotions
            - Improve our services and customer experience
            - Comply with legal obligations
          </ul>
          <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
        </div>
        <hr>
        <div class="privacy-section">
          <h3 class="section-title">Third-Party Sharing</h3>
          <p>We may share your information with payment processors in order to complete transactions, marketing platforms (with opt-out options), as well as legal authorities when required by law. Furthermore , we will never sell your personal data to third parties.</p>
        </div>
        <hr>
        <div class="privacy-section">
          <h3 class="section-title">Your Rights</h3>
          <p>You have the right to access peronal information we hold about you and to ask that your personal information be updated, or deleted. You may choose to opt-out of marketing communications , request service records and withdraw consent for photo usage.</p>
          <p>Requests can be made to <a href="mailto:privacy@autostallion.com">privacy@autostallion.com</a>.</p>
        </div>
        <hr>
        <div class="privacy-section">
          <h3 class="section-title">Cookies & Tracking</h3>
          <p>Our website uses cookies to remember user preferences ,analyze site traffic and to improve user experience.“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier.</p>
          <p> For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org. You can manage cookie preferences in your browser settings.</p>
        </div>
        
       <hr>
          <h3 class="section-title">Policy Changes</h3>
          <p>We may update this policy periodically. Significant changes to our practices or for other operational, legal or regulatory reasons will be communicated through our website or email notifications.</p>
<hr>
        
        <div class="privacy-section">
          <h3 class="section-title">Contact Us</h3>
          <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e‑mail using the details provided below:</p>
          <p>Email: <a href="mailto:privacy@autostallion.com">privacy@autostallion.com</a><br>
          Phone: +21 81 475 8797<br>
          Address: Auto Stallion Detailing, LifeChoice Academy, Cape Town, SA</p>
        </div>
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

.last-updated {
  text-align: right;
  color: #999;
  margin-bottom: 2rem;
  font-size: 0.9rem;
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