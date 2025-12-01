# 📚 BookConnect

> A social networking platform for book lovers to connect, share, and discuss their literary passions

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://book-connect-frontend.vercel.app)

---

## 🎯 Problem Statement

Book readers often struggle to find like-minded individuals to discuss their favorite books, share recommendations, and engage in meaningful literary conversations. Traditional social media platforms lack the focused environment needed for book discussions, and local book clubs may not always be accessible or match personal preferences. 

**BookConnect** bridges this gap by connecting book enthusiasts based on their reading interests, allowing them to discover fellow readers and engage in real-time discussions about their literary journeys.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure user registration and login
- JWT-based session management
- Protected routes with authentication guards

### 👤 Profile Management
- Create and customize user profiles
- Add reading preferences and favorite books
- Update bio and personal information
- Manage book lists (add/remove favorites)

### 🔍 User Discovery & Pagination
- Browse book readers through a paginated feed
- Efficient loading with 10 users per page
- Smooth navigation between pages

### 🤝 Connection System
- Send interest/ignore requests to other readers
- Accept or reject incoming connection requests
- View all established connections
- Manage pending requests

### 💬 Real-time Chat
- Instant messaging with connected users
- Socket.io powered real-time communication
- Chat history persistence

### 🔎 Search & Filter System
- Search users by name
- Filter by favorite books and genres
- Sort results by relevance or alphabetically

---

## 🏗️ System Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │ ───► │   Backend   │ ───► │  Database   │
│  (React.js) │ ◄─── │ (Express.js)│ ◄─── │  (MongoDB)  │
└─────────────┘      └─────────────┘      └─────────────┘
       │                     │
       │                     │
       └──────Socket.io──────┘
         (Real-time Chat)
```

### Components

- **Frontend**: React.js with React Router for navigation
- **Backend**: Node.js + Express.js REST API
- **Database**: MongoDB (NoSQL)
- **Real-time**: Socket.io for instant messaging
- **Authentication**: JWT-based secure authentication

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, React Router, Redux Toolkit, Axios |
| **Styling** | Tailwind CSS, DaisyUI |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Real-time** | Socket.io for instant messaging |
| **Deployment** | Vercel (Frontend), Render (Backend), MongoDB Atlas |

---

## 🚀 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| **Frontend** | Vercel | [book-connect-frontend.vercel.app](https://book-connect-frontend.vercel.app) |
| **Backend** | Render | [bookconnect-backend.onrender.com](https://bookconnect-backend.onrender.com) |
| **Database** | MongoDB Atlas | Cloud-hosted |

---

## 📡 API Overview

### Public Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/signup` | POST | Register new book reader |
| `/login` | POST | Authenticate user |

### Protected Endpoints (Require Authentication)

#### Profile Management
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/profile/view` | GET | Get current user profile |
| `/profile/edit` | PATCH | Update user profile |
| `/profile/genres` | PATCH | Update favorite genres |
| `/profile/books/add` | POST | Add a book to favorites |
| `/profile/books/remove` | DELETE | Remove a book from favorites |
| `/profile/delete` | DELETE | Permanently delete user account |

#### Connection System
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/request/send/:status/:toUserId` | POST | Send connection request (interested/ignored) |
| `/request/review/:status/:requestId` | POST | Accept/reject connection request |
| `/user/requests/received` | GET | Get pending connection requests |
| `/user/connections` | GET | Get all accepted connections |

#### Feed & Discovery
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/feed` | GET | Get paginated feed with search, sort & filter |

#### Chat
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat/:targetUserId` | GET | Get chat history with specific user |
| `/logout` | POST | End user session |

---

## 🎨 Features Showcase

- ✅ **Secure Authentication** - JWT-based with httpOnly cookies
- ✅ **Real-time Messaging** - Instant chat with Socket.io
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **State Management** - Redux Toolkit for efficient state handling
- ✅ **Protected Routes** - Authentication guards for secure pages
- ✅ **Persistent Sessions** - User data persists across page refreshes
- ✅ **Search & Filter** - Find readers by name, books, and genres
- ✅ **Connection Management** - Send, accept, reject requests
- ✅ **Profile Customization** - Personalize your reading profile
- ✅ **Modern UI/UX** - Glassmorphism design with smooth animations

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bookconnect-frontend.git
cd bookconnect-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
- Update `src/utils/constants.js` with your backend URL

4. **Run development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

---

## 📂 Project Structure

```
bookconnect-frontend/
├── src/
│   ├── Components/
│   │   ├── Body.jsx
│   │   ├── Chat.jsx
│   │   ├── Connections.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Feed.jsx
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Requests.jsx
│   │   └── UserCard.jsx
│   ├── utils/
│   │   ├── appStore.js
│   │   ├── axiosConfig.js
│   │   ├── conectionSlice.js
│   │   ├── constants.js
│   │   ├── feedSlice.js
│   │   ├── requestSlice.js
│   │   ├── socket.js
│   │   └── userSlice.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── vercel.json
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by book lovers, for book lovers

---

## 🔗 Links

- **Live Demo**: [https://book-connect-frontend.vercel.app](https://book-connect-frontend.vercel.app)
- **Backend Repository**: [https://github.com/mayank-pillai-99/BookConnect-backend](https://github.com/mayank-pillai-99/BookConnect-backend)
- **Frontend Repository**: [https://github.com/mayank-pillai-99/BookConnect-frontend](https://github.com/mayank-pillai-99/BookConnect-frontend)

---

<div align="center">
  <p>⭐ Star this repo if you find it helpful!</p>
  <p>Made with React, Redux, and lots of ☕</p>
</div>
