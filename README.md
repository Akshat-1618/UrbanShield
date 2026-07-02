# 🚨 UrbanShield

**Smart City Emergency Command Platform**

UrbanShield is a full-stack MERN application that simulates a smart city emergency response system. It enables citizens to report incidents, administrators to coordinate response units in real time, and dispatch to be optimized using graph algorithms and priority-based scheduling.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success?logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-red?logo=socketdotio)

---

## 🌐 Live Demo

https://urban-shield-six.vercel.app/

---

## ✨ Features

- 🆘 **Emergency Reporting** — Citizens can report incidents with location and severity
- 📡 **Real-Time Dispatch** — Live updates and coordination via Socket.IO
- 📍 **Incident Tracking** — Track active and past incidents end-to-end
- 🗺️ **Route Optimization** — Shortest-path routing for response units
- 🚑 **Resource Allocation** — Smart assignment of the nearest available unit
- 🔥 **Heatmap Analytics** — Visualize incident density across the city

---

## 🧠 Algorithms Used

| Algorithm | Purpose |
|---|---|
| **Floyd-Warshall** | Computes all-pairs shortest paths for route optimization |
| **Priority Queue (Max Heap)** | Orders incidents in the dispatch queue by severity |

---

## ⚡ Tech Stack

**Frontend**
- React
- Tailwind CSS
- Leaflet (interactive maps)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Real-Time**
- Socket.IO

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Akshat-1618/UrbanShield.git
```

### Install Dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

### Run the App

**Backend**
```bash
npm run dev
```

**Frontend**
```bash
npm run dev
```

---

## 🌍 Smart Dispatch Workflow

```
Citizen Reports Incident
          │
          ▼
 Incident Stored in Database
          │
          ▼
 Added to Priority Queue
          │
          ▼
 Optimal Route Computed (Floyd-Warshall)
          │
          ▼
 Unit Dispatched to Incident
          │
          ▼
 Live Status Updates (Socket.IO)
          │
          ▼
 Incident Resolved
```
---

## 🚀 Future Improvements

- Push Notifications
- Email Alerts
- AI-based Incident Severity Prediction
- GPS Live Tracking
- Multi-City Support
- Emergency Response Performance Reports

---

⭐ If you found this project useful, don't forget to star the repository.
