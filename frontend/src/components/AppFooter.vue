<template>
  <footer>
    <div class="container-fluid text-white" id="footer">
      <div class="">
        <div class="customContainer">
          <div class="row">
            <!-- <div class="col-sm text-start">
              <h4>Contact Us <br></h4>
              <p>(123) 456-7890<br>
                support@autostallion.co.za</p>
            </div> -->
            <div class="col-sm text">
              <img src="Images/logotr.png" alt="" id="footer-logo">
            </div>
            <!-- <div class="col-sm text text-end">
              <h4>Office Location<br></h4>
              <p>1234 Luxury Lane,<br>Suite 100, State, 12345</p>
            </div> -->
            <br>
          </div>
        </div>
        <hr>
      </div>
      <div class="row justify-content-around text-center">
        <div class="col-md-2">
          <ul class="list-unstyled">
            <li class="fw-bold my-2">Quick Links</li>
            <li><router-link to="/" class="text-decoration-none text-white">Home</router-link></li>
            <li><router-link to="/packages" class="text-decoration-none text-white">Packages</router-link></li>
            <li><router-link to="/booking" class="text-decoration-none text-white">Booking</router-link></li>
            <li><router-link to="/about" class="text-decoration-none text-white">About Us</router-link></li>
            <li><router-link to="/contact" class="text-decoration-none text-white">Contact Us</router-link></li>
          </ul>
        </div>
        <div class="col-md-2">
          <ul class="list-unstyled">
            <li class="fw-bold my-2">Services</li>
            <li><router-link to="/interior" class="text-decoration-none text-white">Interior</router-link></li>
            <li><router-link to="/dry-ice" class="text-decoration-none text-white">Dry Ice</router-link></li>
            <li><router-link to="/ppf" class="text-decoration-none text-white">PPF</router-link></li>
            <li><router-link to="/executive" class="text-decoration-none text-white">Executive</router-link></li>
            <li><router-link to="/presidential" class="text-decoration-none text-white">Presidential</router-link></li>
            <li><router-link to="/signature" class="text-decoration-none text-white">Signature</router-link></li>
          </ul>
        </div>
        <div class="col-md-2">
          <ul class="list-unstyled">
            <li class="fw-bold my-2">Support</li>
            <li><router-link to="/FAQ" class="text-decoration-none text-white">FAQs</router-link></li>
            <li><router-link to="/privacy-policy" class="text-decoration-none text-white">Privacy Policy</router-link></li>
            <li><router-link to="/refund-policy" class="text-decoration-none text-white">Refund Policy</router-link></li>
            <li><router-link to="/terms-and-conditions" class="text-decoration-none text-white">Terms &amp; Conditions</router-link></li>
          </ul>
        </div>
        <div class="col-md-2">
          <li class="fw-bold my-2 list-unstyled text-center">Follow Us</li>
          <ul class="list-unstyled d-flex justify-content-center justify-content-md-center">
            <li><a href="" class="text-white"><i class="fa-brands fa-facebook me-2 fa-1x"></i></a></li>
            <li><a href="https://www.instagram.com/autostallion_inc/" target="_blank" class="text-white"><i class="bi bi-instagram mx-2 fa-1x"></i></a></li>
            <li><a href="" class="text-white"><i class="fa-brands fa-tiktok mx-2 fa-1x"></i></a></li>
            <li><a href="" class="text-white"><i class="fa-brands fa-youtube mx-2 fa-1x"></i></a></li>
          </ul>
            <div class="col">
          <ul class="list-unstyled">
            <li class="fw-bold my-2">Office Location</li>
            <p>1234 Luxury Lane,<br>Suite 100, State, 12345</p>
          </ul>
        </div>
        <!-- <div class="col-sm text text-end">
            <h4>Office Location<br></h4>
            <p>1234 Luxury Lane,<br>Suite 100, State, 12345</p>
        </div> -->
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-12 text-center pt-2">
          <h5>&copy; Copyright © Auto Stallion Official 2025</h5>
          <br>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
#footer{
  background: linear-gradient(transparent, #0a0a0a);
  color: #fff;
}
#footer-logo{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 300px;
}
</style>
