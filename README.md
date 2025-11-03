# BookConnect

- Create a Vite + React application
- Remove unecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }
- install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder 
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in th store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Conenction REquests
- Feature - Accept/Reject connection request
- Send/Ignore the user card from the feed 
- Signup New User 
- E2E testing


<<<<<<< HEAD
Body 
    NavBar
    Route=/  => Feed
    Route=/login  => Login
    Route=/connetions => Connections
    Router=/profile => Profile
=======
**BookConnect** is a MERN stack application where book lovers can create profiles, send connection requests, and connect with each other, similar to a networking platform for readers. This repository contains the frontend for BookConnect.

## 🛠 Tech Stack

-  **Frontend:** React.js, Vite, Redux Toolkit, Tailwind CSS
-  **State Management:** Redux Toolkit
-  **Backend:** [BookConnect Backend](https://github.com/akshadjaiswal/bookconnect-backend)
-  **Authentication:** JWT
-  **Database:** MongoDB (via backend)

## 📌 Features

- 🏠 **Reader Profiles** - Create and customize your profile.
- 🤝 **Connect with Readers** - Send and accept connection requests.
- 🔒 **Authentication** - Secure login & signup using JWT.
- 👀 **View Profiles** - Browse other reader profiles.
- ✏️ **Edit Profile** - Update personal details, favorite genres, and bio.
- 📩 **Send Connection Requests** - Request to connect with other book lovers.
- ✅ **Review Connection Requests** - Accept or reject incoming connection requests.
- 🌍 **Responsive Design** - Fully optimized for mobile & desktop.


>>>>>>> 22b8ff9d15b88a08cc098f318733eaf0a3eea314
