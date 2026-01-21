# 🎮 Quiz Vortex - Firebase Setup Guide

## 📋 What's New

✅ **Authentication System** - Complete login/signup with Firebase
✅ **Profile Management** - Edit username, bio, and choose avatars
✅ **Protected Routes** - Secure pages with auth protection
✅ **Gorgeous UI** - Modern, animated, highly addictive design
✅ **User Persistence** - Automatic profile data syncing with Firebase

---

## 🚀 Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://firebase.google.com/)
2. Click "Create Project"
3. Enter project name: `quiz-vortex`
4. Continue and create the project

### Step 2: Add Web App to Firebase

1. In your Firebase project, click the gear icon → Project Settings
2. Click "Add App" → Web
3. Register the app as `Quiz Vortex`
4. Copy your config object

### Step 3: Update Firebase Config

Open [config/firebase.ts](config/firebase.ts) and replace the firebaseConfig with your credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Step 4: Enable Authentication

1. Go to Firebase Console → Authentication
2. Click "Get Started"
3. Enable **Email/Password** authentication
4. Save changes

### Step 5: Create Firestore Database

1. Go to Firebase Console → Firestore Database
2. Click "Create Database"
3. Start in **production mode**
4. Set location to your nearest region
5. Once created, go to Rules tab and use this security rule:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /leaderboard/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

---

## 📁 New Files Structure

```
config/
├── firebase.ts          # Firebase initialization
└── authService.ts       # Authentication service

pages/
├── Login.tsx           # Login page with attractive UI
├── Signup.tsx          # Signup page with validation
├── Profile.tsx         # Enhanced profile with edit mode
└── ...

components/
└── Navbar.tsx          # Updated with logout & user menu
```

---

## 🎨 Features Overview

### Login Page

- Email/password authentication
- Show/hide password toggle
- Remember me option
- Error handling
- Smooth animations
- Demo credentials shown

### Signup Page

- Two-step process (info → password)
- Username validation (3-20 chars, alphanumeric + underscore)
- Password strength indicator (6+ chars, uppercase, numbers)
- Avatar selection from DiceBear API
- Progress indicator
- Comprehensive error messages

### Profile Page

- **View Mode**: Display stats, achievements, coins, bio
- **Edit Mode**:
  - Change avatar from 8 options
  - Edit username (max 20 chars)
  - Edit bio (max 150 chars)
  - Real-time character count
  - Save to Firebase

### Enhanced UI Features

- Glassmorphism design
- Gradient backgrounds
- Smooth animations (Framer Motion)
- Hover effects on interactive elements
- Custom cursor effect
- Responsive design
- Dark theme with vibrant accents

---

## 🔐 Authentication Flow

```
User visits app
    ↓
Check Firebase Auth State
    ↓
    ├─ Logged in? → Load user profile → Show dashboard
    └─ Not logged in? → Show landing page

Login/Signup
    ↓
Firebase creates account
    ↓
Generate random avatar
    ↓
Save user profile to Firestore
    ↓
Redirect to /lobby
```

---

## 💾 User Data Structure

```typescript
User {
  id: string;              // Firebase UID
  username: string;        // Battle name
  email?: string;          // Email address
  avatar: string;          // Avatar URL
  coins: number;           // Game currency
  bio?: string;            // Profile bio
  level?: number;          // User level
  achievements?: string[]; // Achievement list
  stats: {
    gamesPlayed: number;
    wins: number;
    avgResponseTime: number;
    highestStreak: number;
  };
}
```

---

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm build
```

---

## 📝 Environment Variables

Create a `.env` file (optional, for sensitive data):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🚀 Usage

### Login/Signup

1. Visit the app → Landing page
2. Click "Create Account" for signup or "Sign In" for login
3. Fill in credentials and submit
4. Redirects to /lobby after successful authentication

### Edit Profile

1. Click your avatar in navbar
2. Select "Edit Profile"
3. Change avatar, username, or bio
4. Click "Save Changes"
5. Changes sync to Firebase automatically

### Logout

1. Click your avatar in navbar
2. Click "Logout"
3. Redirects to landing page

---

## 🎯 Routes

| Route          | Auth Required | Purpose      |
| -------------- | ------------- | ------------ |
| `/`            | No            | Landing page |
| `/login`       | No            | Login page   |
| `/signup`      | No            | Signup page  |
| `/lobby`       | Yes           | Game lobby   |
| `/profile`     | Yes           | User profile |
| `/leaderboard` | Yes           | Rankings     |
| `/admin`       | Yes           | Admin panel  |
| `/room/:id`    | Yes           | Game room    |

---

## 🐛 Troubleshooting

### Firebase Config Error

- Ensure your config is correctly copied from Firebase Console
- Check that email/password auth is enabled

### User Data Not Saving

- Verify Firestore security rules are correct
- Check browser console for errors
- Ensure user is authenticated

### Avatar Not Changing

- Clear browser cache
- Try different avatar options
- Check console for API errors

### Can't Login

- Verify email/password are correct
- Check that account exists
- Ensure Firebase is initialized

---

## 🎨 Customization

### Change Theme Colors

Edit the color classes in components (e.g., `from-indigo-600` to `from-blue-600`)

### Modify Avatar Options

Update `AVATAR_OPTIONS` in Profile.tsx with custom avatar URLs

### Change UI Animations

Adjust `transition`, `variants`, and `animate` props in Framer Motion components

---

## 📱 Mobile Responsive

All pages are fully responsive:

- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

---

## 🔒 Security Notes

- Never expose Firebase config in production
- Use environment variables for sensitive data
- Firestore rules prevent unauthorized access
- Passwords are hashed by Firebase Auth

---

## 📚 Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ✨ Future Enhancements

- Social login (Google, GitHub)
- Password reset flow
- Avatar upload from file
- Friend system
- Achievements system
- Real-time multiplayer sync

---

Enjoy the vortex! 🌪️⚡
