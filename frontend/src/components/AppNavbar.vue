<template>
  <header>
    <a href="#" class="logo">
      <img src="Images/logotr.png" width="190px" alt="">
    </a>
    <input type="checkbox" id="check">
    <label for="check" class="icons">
      <i class="fa-solid fa-bars" id="menu-icon"></i>
      <i class="fa-solid fa-xmark" id="close-icon"></i>
    </label>
    <nav class="navigation">
  <router-link to="/" class="nav-links" style="--i:0;">Home</router-link>
  <div class="dropdown" style="--i:1;"
    @pointerenter="showDropdown = true"
    @pointerleave="showDropdown = false"
  >
    <router-link to="/packages" @click.native.stop>Services</router-link>
    <ul class="dropdown-menu" v-show="showDropdown">
      <li><router-link to="/interior" class="dropdown-item">Interior</router-link></li>
      <li><router-link to="/dry-ice" class="dropdown-item">Dry Ice</router-link></li>
      <li><router-link to="/ppf" class="dropdown-item">PPF</router-link></li>
      <li><router-link to="/executive" class="dropdown-item">Executive</router-link></li>
      <li><router-link to="/presidential" class="dropdown-item">Presidential</router-link></li>
      <li><router-link to="/signature" class="dropdown-item">Signature</router-link></li>
    </ul>
  </div>
  <router-link to="/about" class="nav-links" style="--i:3;">About Us</router-link>
  <router-link to="/contact" class="nav-links" style="--i:4;">Contact Us</router-link>
      <template v-if="isLoggedIn">
        <!-- <span class="nav-links" style="font-weight:600;--i:6;">Welcome, {{ userName }}</span> -->
        <button @click="logout" class="nav-links" style="background:none;border:none;color:inherit;cursor:pointer;font:inherit;--i:5;font-size: 20px;">Logout</button>
        <span class="nav-links" style="font-weight:600;--i:6;margin-left: 50px;font-size: 1.5rem;margin-right: 70px;">Welcome, {{ userName }}</span>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-links" style="--i:5;font-weight:600;margin-left: 70px;font-size: 1.3rem;margin-right: 70px;">Login</router-link>
      </template>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('user'),
      userName: this.getUserName(),
  showDropdown: false
    }
  },
  mounted() {
    window.addEventListener('storage', this.syncLoginState);
    window.addEventListener('user-logged-in', this.syncLoginState);
    if (this.$router) {
      this.unwatchRoute = this.$router.afterEach(() => {
        this.syncLoginState();
      });
    }
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncLoginState);
    window.removeEventListener('user-logged-in', this.syncLoginState);
    if (this.unwatchRoute) {
      this.unwatchRoute();
    }
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
  },
  methods: {
    getUserName() {
      const userStr = localStorage.getItem('user');
      if (!userStr) return '';
      try {
        const user = JSON.parse(userStr);
        return user.name || user.firstName || user.username || user.email || '';
      } catch {
        return '';
      }
    },
    async logout() {
      if (window.confirm('Are you sure you want to log out of your Auto Stallion account? You will need to log in again to access your account.')) {
        try {
          await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (err) {
        }
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        this.isLoggedIn = false;
        this.$router.push('/');
      }
    },
    syncLoginState() {
      this.isLoggedIn = !!localStorage.getItem('user');
      this.userName = this.getUserName();
    }
  },
}
</script>

<style scoped>

/* Dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}
/* .dropdown-toggle::after {
font-size: 5em;
} */


.dropdown-menu {
  display: none;
  position: absolute;
  left: 0;
  top: 98%;
  background: #232323;
  width: 220px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  z-index: 200;
  margin-top: 0;
  border-radius: 12px;
  padding: 0.35rem 0 0.5rem 0;
  border: 1.5px solid #333;
  pointer-events: auto;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu li {
  list-style: none;
  margin: 0;
  padding: 0;
}
  .dropdown-item {
    color: #fff;
    padding: 0.7rem 1.2rem;
    display: block;
    text-decoration: none;
    font-size: 1.08rem;
    text-align: left;
    border: none;
    background: none;
    border-radius: 7px;
    margin: 0.1rem 0;
  }
.dropdown-item:last-child {
  border-bottom: none;
}
.dropdown-item:hover {
  color: #c1902d;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.7rem 0 1.7rem 0; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  color: #fff;
  background: rgba(0, 0, 0, .1);
  backdrop-filter: blur(50px);
  margin-bottom: 0;
  border-bottom: 1.5px solid #232323;
}
.logo {
  font-size: 2rem;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5rem; 
}
  .navigation a, .navigation button {
    font-size: 1.22rem;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.18s;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
  }
  .navigation .active,
  .navigation .router-link-exact-active,
  .navigation .router-link-active {
    color: #c1902d !important;
    font-weight: 900;
  }
  .nav-links {
    position: relative;
    color: #fff;
    font-weight: 900;
    transition: color 0.18s ease-in-out;
  }
  .nav-links::after {
    content: '';
    width: 0;
    height: 3px;
    background-color: #c1902d;
    position: absolute;
    left: 0;
  }
  .nav-links:hover::after {
    width: 100%;
  }

#check:checked~.navigation {
  height: auto;
  max-height: 500px;
  transition: max-height 0.3s ease;
}
.icons {
  position: absolute;
  right: 5%;
  font-size: 2.8rem;
  color: #fff;
  cursor: pointer;
  display:none;
}
@media (max-width: 1000px) {
  .header{
    padding: 1.3rem 5%;
  }
}
@media (max-width: 768px) {
  .icons {
    display: inline-flex;
    font-size: 1.8rem;
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
</style>
