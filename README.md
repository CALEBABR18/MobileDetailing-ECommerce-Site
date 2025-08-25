<h2 align="center"><strong>A u t o  S t a l l i o n</strong></h2>
<h5 align="center">---DETAILING EMPORIUM---</h5>

- - - -
Auto Stallion is a premium e-commerce mobile car detailing business based in Cape Town. We specialize in eco-friendly cleaning, using waterless and low-water washes, sustainable products, and protective ceramic coatings. Our solar-powered, portable setup means customers get high-quality car care right at their homes and offices. This project features interactive detailing packages with step-by-step visuals, seamless booking, and secure payment all in one page.
- - - -
## Table of Contents
 - [Live Demo](#live-demo)
 - [Key Features](#key-features)
 - [Technologies Used](#technologies-used)
 - [Set up Instructions](#set-up-instructions)
 - [Login Credentials](#login-credentials)
 - [Contributing](#contributing)

- - - -
## Live Demo
[Link to the live deployed website](https://github.com/CALEBABR18/MobileDetailing-ECommerce-Site.git)
- - - -
## Key Features
 * User Authentication: Sign up , login , and reset password functionality via email.
 * Landing Homepage: Designed with a strong sales pitch to build trust and engage users.
 * Detailing Services: Dropdown menu showcasing all detailing packages offered.
 * Booking Modal: Pop-up modal where users book a detailing package based on their car size.
 * Payment Integration: Secure online Payments using Stripe.
 * Legal Pages: Policy , refunds , terms and conditions, and FAQs are accessible in the footer. 

- - - - 
## Technologies Used
    * Frontend: Vue 3 ,
    * Backend: Node.js ,Express.js
    * Database: MySQL
    * Payment: Stripe
    * Authentication : JWT
    * Email Sending: Nodemailer
    
    * Dependencies:
    * jsonwebtoken
    * bcryptjs
    * express
    * dotenv
    * cors
    * mysql2
    * nodemailer
    * cookies
    * axios
    * crypto
- - - -
### Prerequisites
Requirements for the software and other tools to build, test and push
- Node.js
- MySQL installed
- VS code
- - - -
### Set up Instructions
Follow these steps to get the AutoStallion backend running locally:
1. **Clone the Repository**
```bash
    git clone [https://github.com/CALEBABR18/MobileDetailing-ECommerce-Site.git]
   ```
2. **Install dependencies**
   
   Navigate to backend then install dependencies
```bash
    cd backend
    npm install
```

  Navigate to frontend then install dependencies
```bash
    cd frontend
    npm install
```

  Navigate out then install stripe
```bash
    cd ..
    npm install stripe
```
3. **Database setup**
   
   Connect to the MySQL database.
   
   Create a .env file, change the password to your MySQL password and a strong `JWT_SECRET`.
   
```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=main
    JWT_SECRET=auto_stallion
    EMAIL_USER=your_email@gmail.com 
    EMAIL_PASSWORD=your_password (Get your personal email password from Google by creating an app password for gmail and pasting the sepcial password there. This is for the forgot password feature using nodemailer.)
    FRONTEND_URL=http://localhost:8080
    PORT=5000
    STRIPE_SECRET_KEY=your_stripe_key

```
4. **Run the backend server**
```bash
cd backend
node server.js
```
This server will run on http://localhost:5000

5. **Start frontend server:**
```bash
cd frontend
npm run serve
```

6. It will generate links, click the local link to see the website.
```bash
 App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.3.150:8080/
```

### Login Credentials
Users can browse the site freely. To make a booking, they must sign up and log in.
  - - - -
  
## Contributing
This project is a collaborative effort by group:
- *Caleb Abrahams*
- *Zaaidah Abrahams*
- *Raeesa Samaai*
- *Lukho Dlongothi*
- - - -

