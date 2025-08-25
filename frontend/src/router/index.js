import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Forgot from '@/views/Forgot.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Contact from '@/views/contact.vue'
import FAQ from '@/views/FAQ.vue'
import Packages from '@/views/Packages.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import TermsAndConditions from '@/views/TermsAndConditions.vue'
import Interior from '@/views/Interior.vue'
import PPF from '@/views/ppf.vue'
import Signature from '@/views/signature.vue'
import Executive from '@/views/executive.vue'
import Presidential from '@/views/Presidential.vue'
import Customer from '@/views/customer.vue'
import Refunds from '@/views/refunds.vue'
import Payments from '@/views/payments.vue'
import Booking from '@/views/booking.vue'
import Dryice from '@/views/dryice.vue'
import Bookings from '@/views/bookings.vue'
import RefundPolicy from '@/views/RefundPolicy.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/refund-policy',
    name: 'RefundPolicy',
    component: RefundPolicy
  },
  {
    path: '/terms-and-conditions',
    name: 'TermsAndConditions',
    component: TermsAndConditions
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ppf',
    name: 'ppf',
    component: PPF
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: Forgot
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    component: ResetPassword
  },
  {
    path: '/packages',
    name: 'packages',
    component: Packages
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/interior',
    name: 'interior',
    component: Interior
  },
  {
    path: '/signature',
    name: 'signature',
    component: Signature
  },
  {
    path: '/executive',
    name: 'executive',
    component: Executive
  },
  {
    path: '/presidential',
    name: 'presidential',
    component: Presidential
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer
  },
  {
    path: '/refunds',
    name: 'refunds',
    component: Refunds
  },
  {
    path: '/booking',
    name: 'booking',
    component: Booking
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: Bookings
  },
  {
    path: '/dry-ice',
    name: 'dryice',
    component: Dryice
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
