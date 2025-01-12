# Mini Social Media Application

A small-scale social media application built using **React JS** with **TypeScript** and styled with **Tailwind CSS**, while leveraging **Firebase** for authentication, database, and hosting.

---

## Features

- **User Authentication**
  - Register and log in using Firebase Authentication.
  - Password-based authentication.

- **Post Management**
  - Users can post, like, save and delete their posts.
  - View posts from all users.

- **Interactive Features**
  - Like posts.
  - Add comments to posts.

- **Responsive Design**
  - Optimized for both desktop and mobile devices.

- **Real-Time Updates**
  - Posts and interactions update in real-time using Firebase Firestore.

---

## Tech Stack

### Frontend
- **React JS** (with **Vite** for fast development)
- **TypeScript** for type-safe development
- **Tailwind CSS** for styling

### Backend & Hosting
- **Firebase**:
  - Authentication (Email & Password)
  - Firestore (NoSQL Database)
  - Firebase Storage (For media uploads)
  - Firebase Hosting

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (or **yarn**)
- A Firebase project set up ([Firebase Console](https://console.firebase.google.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-media-app.git
   cd social-media-app

### Dependency 

 ```bash
 npm install
# or
yarn install
```

### Create .env File
-- Create the .env file in the root directory and add the firebase config

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

```

### Start the Development Server

```
npm run dev
```


### Open the app in browser

```
http://localhost:5173
```


