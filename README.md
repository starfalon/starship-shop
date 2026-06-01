# Starship Shop

A Star Wars-themed e-commerce application built with React and Node.js/Express.

---

## Tech Stack

**Frontend:** React, React Router, Axios, Vite  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT  
**Design:** Figma

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repository:

git clone https://github.com/starfalon/starship-shop.git
cd starship-shop

2. Set up the backend:

cd server
npm install

3. Create a .env file in the server/ folder:
   PORT=5000
   CONNECTION_STRING=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_secret_key

4. Seed the database with products and default user:

node seed.js
node seedUser.js

5. Start the backend:

node server.js

6. Set up the frontend (in a new terminal):

cd client
npm install
npm run dev

7. Open `http://localhost:5173` in your browser.

---

## Default Login

Email: user@galacticfleet.com
Password: password

---

## Features

- Browse and filter ships by category
- Add ships to cart and adjust quantities
- Save ships to favorites (persisted in localStorage)
- User registration and login with JWT authentication
- Checkout with form validation
- Orders saved to MongoDB
- Responsive design for desktop and mobile

---

## Project Structure

starship-shop/
├── client/ # React frontend
│ └── src/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ └── pages/
├── server/ # Node.js + Express backend
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ └── routers/
└── README.md
