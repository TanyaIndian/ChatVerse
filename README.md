# 🚀 ChatVerse

**ChatVerse** is a full-stack real-time chat web app featuring modern UI, JWT-based authentication, and real-time communication using **Socket.IO**. It includes a unique interactive animation where a 3D paper plane flies across the screen whenever a message is sent — built using **Three.js** and **GSAP**.

---

## 🌐 Tech Stack

### 🖥️ Frontend  
**React 19** | **React Router DOM v7** | **Redux Toolkit** | **Socket.IO Client** | **Axios**  
**React Three Fiber** | **@react-three/drei** | **Three.js** | **GSAP** | **Emoji Picker** | **React Icons**  

### 🔧 Backend  
**Node.js** | **Express 5** | **Socket.IO** | **MongoDB** | **Mongoose** | **JWT**  
**bcryptjs** | **Cloudinary** | **Multer** | **dotenv** | **CORS** | **Cookie Parser**

---

## ✨ Features

- 🔐 **JWT Authentication** (7-day expiry)  
- 💬 **Real-Time Messaging** (via Socket.IO)  
- 👤 **User Profiles** (add/edit profile picture, update username)  
- 🖼️ **Image Upload Support** (via Cloudinary)  
- 📶 **Live Online/Offline User Status**  
- 😄 **Emoji Picker for Chats**  
- 🛸 **Flying 3D Paper Plane** animation on message send  
- 📱 **Fully Responsive** design for mobile and desktop

---


## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatverse.git
cd chatverse


###2. Backend Setup

```bash
cd backend
npm install
```

### Create a .env file inside the backend directory:

```bash
PORT=8000
MONGODB_URL=<YOUR_MONGODB_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
API_KEY=<YOUR_CLOUDINARY_API_KEY>
API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

Start the backend server:
npm run dev
```

###3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```


## 📸 Screenshots

### 🔑 Sign Up Page  
![SignUp](https://github.com/user-attachments/assets/9e0bc770-f499-47f1-b507-214a17962862)

### 🔐 Login Page  
![Login](https://github.com/user-attachments/assets/e7b4188d-9ff2-4b2b-a1b1-6618b4dc61b1)

### 🏠 Home Page  
![Home](https://github.com/user-attachments/assets/7a7cbad8-773e-46e6-8259-d5c61a8816a5)

### 🙍‍♂️ Profile Page  
![Profile](https://github.com/user-attachments/assets/8b04afdd-8221-410f-b1e4-3085e3487c1f)

---





