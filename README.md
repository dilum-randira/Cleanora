<p align="center">
  <img 
    width="100%" 
    alt="Cleanora - Premium Cleaning Service Management System" 
    src="https://github.com/user-attachments/assets/2fa5900d-4cc6-4ade-9063-1e87c7bcda31" 
  />
</p>

<h1 align="center">Cleanora - Full-Stack Cleaning Service Management System</h1>

<p align="center">
  A premium cleaning service booking platform with dynamic services, online booking, MongoDB integration, and a protected admin dashboard.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

<p align="center">
  <a href="#-project-overview">Overview</a> •
  <a href="#-key-features">Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-installation--setup">Setup</a> •
  <a href="#-api-documentation">API</a> •
  <a href="#-admin-login-credentials">Admin Login</a>
</p>

---


<h1 align="center">Cleanora - Full-Stack Cleaning Service Management System</h1>

<p align="center">
  A premium cleaning service booking platform built with React, Tailwind CSS, Node.js, Express.js, and MongoDB.
</p>

---

## 📌 Project Overview

Cleanora is a full-stack cleaning service management web application that allows customers to browse cleaning services, book appointments online, and allows administrators to manage customer booking requests through a protected admin dashboard.

This project was developed as a complete end-to-end web application with frontend, backend, database integration, authentication, admin management, and responsive UI design.

---

## 🚀 Key Features

### Customer Side

- Modern home page with hero section
- About section
- Dynamic cleaning service menu
- Service cards loaded from MongoDB
- Online booking form
- Service selection from database
- Date and time selection
- Address and contact details input
- Booking form validation
- Gallery section
- Customer reviews section
- Contact section
- Embedded Google Map
- WhatsApp quick contact button
- Fully responsive UI for mobile, tablet, and desktop

### Admin Side

- Protected admin login
- JWT-based authentication
- Booking management dashboard
- View all customer bookings
- Dashboard statistics
  - Total bookings
  - Pending bookings
  - Completed bookings
- Booking activity chart
- Mark bookings as completed
- Delete booking entries
- Logout functionality

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Dotenv
- CORS

### Database

- MongoDB Atlas / Local MongoDB

---

## 📁 Project Structure

```txt
cleanora-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeders/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend `.env`

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@cleanora.com
ADMIN_PASSWORD=admin123
```

### Frontend `.env`

Create a `.env` file inside the `frontend` folder.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> Important: Do not commit real `.env` files to GitHub. Only commit `.env.example`.

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cleanora-platform.git
cd cleanora-platform
```

---

## 🖥️ Backend Setup

```bash
cd backend
npm install
```

Create the backend `.env` file and add the required environment variables.

Run the backend server:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

Test backend health:

```txt
http://localhost:5000/api/health
```

---

## 🌐 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create the frontend `.env` file and add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

## 🌱 Database Seed Commands

Run these commands inside the `backend` folder.

### Seed Services

```bash
npm run seed:services
```

This inserts 8 cleaning service records.

### Seed Reviews

```bash
npm run seed:reviews
```

This inserts 6 customer review records.

### Seed Demo Bookings

```bash
npm run seed:bookings
```

This inserts 10 demo booking records for admin dashboard demonstration.

---

## 🔐 Admin Login Credentials

Use the following demo credentials to access the admin dashboard:

```txt
Email: admin@cleanora.com
Password: admin123
```

Admin login page:

```txt
http://localhost:5173/admin/login
```

---

## 📡 API Documentation

### Health Check

```http
GET /api/health
```

### Services

```http
GET /api/services
GET /api/services/:id
POST /api/services
```

### Reviews

```http
GET /api/reviews
POST /api/reviews
```

### Bookings

```http
POST /api/bookings
GET /api/bookings
GET /api/bookings/:id
PATCH /api/bookings/:id/complete
DELETE /api/bookings/:id
```

> Note: Admin booking routes are protected and require a JWT token.

### Admin

```http
POST /api/admin/login
```

---

## 🧪 Testing Flow

### Customer Flow

1. Open the home page.
2. View cleaning services.
3. Click `Book This Service`.
4. Fill the booking form.
5. Submit the booking.
6. Confirm success message.

### Admin Flow

1. Go to `/admin/login`.
2. Login using admin credentials.
3. View booking dashboard.
4. Check total, pending, and completed bookings.
5. Mark a booking as completed.
6. Delete a test booking.
7. Logout from admin panel.

---

## 🎥 Video Demo Flow

The project demo video should show:

1. Home page and hero section
2. Dynamic services loaded from MongoDB
3. Booking form submission
4. Booking saved successfully
5. Admin login
6. Admin dashboard
7. View submitted booking
8. Mark booking as completed
9. Delete booking
10. Gallery and reviews section
11. Responsive mobile view
12. GitHub repository and README

---

## ✅ Completed Requirements

- Frontend and backend integration
- Dynamic services from database
- Online booking form
- Booking data saved to MongoDB
- Protected admin dashboard
- Mark booking as completed
- Delete booking
- Gallery section
- Reviews section
- Contact and footer
- WhatsApp quick contact button
- Responsive UI
- README documentation
- Seeder scripts for demo data

---

## 🔒 Security Notes

- Real `.env` files are ignored from GitHub.
- MongoDB connection string is stored using environment variables.
- Admin dashboard is protected using JWT authentication.
- Sensitive credentials should not be hardcoded in source code.

---

## 👨‍💻 Developer

Developed by **Dilum Randira**

---

## 📄 License

This project is developed for academic and portfolio purposes.
