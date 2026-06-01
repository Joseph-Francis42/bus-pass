# 🚌 Smart Bus Pass Booking System

<div align="center">
  
  [![Vite](https://img.shields.io/badge/Vite-B736FF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  
  [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
  [![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

  <h4>A premium, full-stack digital bus pass management platform designed for college campuses.</h4>

  <a href="https://joseph-francis42.github.io/bus-pass/">
    <img src="https://img.shields.io/badge/🚀%20Visit%20Live%20Website-Click%20Here-blueviolet?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Site" />
  </a>

</div>

---

## 🌟 Live Deployed Links

* **Frontend Client (GitHub Pages)**: [https://joseph-francis42.github.io/bus-pass/](https://joseph-francis42.github.io/bus-pass/)
* **Backend API Server (Render)**: [https://bus-pass-api.onrender.com](https://bus-pass-api.onrender.com)

---

## 📖 Project Overview

The **Smart Bus Pass Booking System** is a modern full-stack web application designed for students and administrators at **SJCET Palai**. It replaces manual paper-based bus pass allocation with an instantaneous, digital, and secure workflow.

### Key Highlights:
* 🔒 **Campus Restrictive Logins**: Restricts logins strictly to official institutional domains (`@sjcetpalai.ac.in`) with inline error notifications.
* 🎫 **Instant Pass Booking**: Students can easily book passes from the institutional hub (`SJCET PALAI`) to any destination in seconds.
* 📊 **Smart Seat Allocations**: Prevents overbooking by checking live vehicle capacity before confirming requests.
* 👮 **Admin Panel Dashboard**: Real-time administrative controls to approve or reject requests, refresh live bookings, and update the global capacity safely.

---

## 🛠️ Architecture & Tech Stack

```
                               ┌────────────────────────┐
                               │     GitHub Pages       │
                               │  (React Vite Frontend) │
                               └───────────┬────────────┘
                                           │
                                           │ API Requests (HTTPS)
                                           ▼
                               ┌────────────────────────┐
                               │        Render          │
                               │  (Express Node Server) │
                               └───────────┬────────────┘
                                           │
                                           │ Database Queries
                                           ▼
                               ┌────────────────────────┐
                               │     MongoDB Atlas      │
                               │     (Cloud Database)   │
                               └────────────────────────┘
```

* **Frontend**: React, Vite, React Router, Axios, Lucide Icons, Glassmorphism CSS.
* **Backend**: Node.js, Express.js, Cors, Mongoose.
* **Database**: MongoDB (Atlas).
* **Automation**: GitHub Actions (CI/CD pipeline for 1-click deployments to GitHub Pages).

---

## 🚀 Key Features & Implementation Detail

### 1. Secure Domain Filter
Only official student accounts are allowed to proceed. Entering an external email triggers a dynamic inline alert without blocking browser threads.
```javascript
const email = identifier.trim().toLowerCase();
if (!email.endsWith('@sjcetpalai.ac.in')) {
  setError('Incorrect email');
  return;
}
```

### 2. Live Capacity Constraints
Ensures students never book a pass on a bus that is already fully booked. If a bus reaches its maximum limit (e.g. 40 seats), the route automatically flags a full status page to prevent congestion.

### 3. Unified Developer Builds
Built as a monorepo, a single command from the root directory compiles and setups both packages:
```json
"scripts": {
  "install-all": "npm install --prefix backend && npm install --prefix frontend",
  "build-frontend": "npm run build --prefix frontend",
  "build": "npm run install-all && npm run build-frontend"
}
```

---

## 💻 Local Installation & Setup

To run this MERN stack application locally:

### 1. Clone the repository
```bash
git clone https://github.com/Joseph-Francis42/bus-pass.git
cd bus-pass
```

### 2. Setup your Environment
Create a `.env` file inside `/backend` and set your MongoDB URI:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/buspass
```

### 3. Install & Start Development Servers
```bash
# Run from the root directory:
npm run install-all

# Start the Backend Server (Term 1):
cd backend
npm run dev

# Start the Frontend Server (Term 2):
cd ../frontend
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser to view your local app!

---

<div align="center">
  <sub>Developed for SJCET Palai. Built with ❤️ using the MERN stack.</sub>
</div>
