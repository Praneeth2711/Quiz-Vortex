# 🎮 Quiz Vortex - Complete Authentication & Profile System

> A stunning, modern quiz game with Firebase authentication, profile management, and an addictive UI that'll keep users coming back.

## 🌟 What's New - Complete Feature Overview

### 🔐 Authentication System

- **Firebase Auth Integration** - Secure email/password authentication
- **Signup Flow** - 2-step registration with validation
- **Login Flow** - Remember me and show/hide password
- **Session Persistence** - Auto-login on app refresh
- **Protected Routes** - Auth guards on game pages
- **Logout** - Secure session termination

### 👤 Profile Management

- **View Profile** - Display stats, achievements, coins, badges
- **Edit Profile** - Change avatar, username, bio
- **Avatar Selection** - 8 beautiful DiceBear avatars to choose from
- **Real-time Sync** - Changes saved to Firebase instantly
- **Character Counters** - Input validation with character limits
- **Cloud Persistence** - All data stored in Firestore

### 🎨 UI/UX Enhancements

- **Glassmorphism Design** - Modern frosted glass effect
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Framer Motion for fluid interactions
- **Responsive Design** - Perfect on mobile, tablet, desktop
- **Interactive Elements** - Hover effects, click feedback
- **Dark Theme** - Eye-friendly with vibrant accents
- **Custom Cursor** - Interactive cursor effect (desktop)
- **Loading States** - Spinners and animations during async tasks

### 🧭 Navigation & UX

- **Smart Navbar** - Shows login/signup or user menu based on auth state
- **Dropdown Menu** - Quick access to profile, leaderboard, play
- **One-Click Logout** - Easy session termination
- **Beautiful Transitions** - Page animations on route changes
- **Error Handling** - User-friendly error messages

---

## 📁 Project Structure

```
quiz-vortex/
├── config/
│   ├── firebase.ts           # Firebase configuration & initialization
│   └── authService.ts        # Authentication service functions
├── pages/
│   ├── Landing.tsx           # Updated with signup/login CTAs
│   ├── Login.tsx            # ✨ NEW: Login page
│   ├── Signup.tsx           # ✨ NEW: Signup page
│   ├── Profile.tsx          # ✨ UPDATED: Edit profile feature
│   ├── Lobby.tsx
│   ├── GameRoom.tsx
│   ├── Leaderboard.tsx
│   └── Admin.tsx
├── components/
│   ├── Navbar.tsx           # ✨ UPDATED: Auth-aware with logout menu
│   ├── ChatPanel.tsx
│   └── ...
├── App.tsx                  # ✨ UPDATED: Firebase auth integration
├── types.ts                 # ✨ UPDATED: User type with email & bio
├── constants.tsx
├── index.tsx
├── index.css
├── vite.config.ts
├── tsconfig.json
├── package.json
├── QUICK_START.md           # ✨ NEW: 5-minute setup guide
├── FIREBASE_SETUP.md        # ✨ NEW: Detailed Firebase instructions
└── README.md                # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Firebase account (free tier works great!)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a Web App
4. Copy your config object
5. Paste into `config/firebase.ts`

### Step 3: Enable Authentication

```
Firebase Console → Authentication → Sign-in Methods
→ Email/Password → Enable
```

### Step 4: Create Firestore Database

```
Firebase Console → Firestore Database
→ Create Database → Production Mode → Select Region
```

### Step 5: Set Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

### Step 6: Run the App

```bash
npm run dev
# Open http://localhost:5173
```

---

## 🎯 How to Use

### Sign Up (New User)

1. Click "JOIN THE VORTEX" on landing page
2. Enter email and choose battle name
3. Click "Continue"
4. Create password (6+ chars, uppercase, numbers)
5. Select avatar from 8 options
6. Click "Create Account"
7. Redirects to `/lobby`

### Login (Existing User)

1. Click "ENTER ARENA" on landing page
2. Enter email and password
3. Optionally check "Remember me"
4. Click "Enter the Vortex"
5. Redirects to `/lobby`

### Edit Profile

1. Click your avatar in navbar
2. Select "Edit Profile"
3. Choose new avatar
4. Update username (max 20 chars)
5. Add/edit bio (max 150 chars)
6. Click "Save Changes"
7. Changes sync to Firebase

### Logout

1. Click your avatar in navbar
2. Click "Logout"
3. Redirected to landing page

---

## 🔐 Authentication Flow

```
App Loads
  ↓
Firebase checks auth state (onAuthStateChanged)
  ↓
  ├─ User logged in?
  │  ├─ Fetch user profile from Firestore
  │  ├─ Set user state
  │  ├─ Enable protected routes
  │  └─ Show dashboard
  │
  └─ User not logged in?
     ├─ Clear user state
     ├─ Show landing page
     └─ Redirect to /login for protected routes
```

---

## 📊 Data Structure

### Firestore Collection: `/users/{userId}`

```typescript
{
  id: string;                    // Firebase UID (auto-set)
  username: string;              // Battle name (3-20 chars)
  email: string;                 // User email
  avatar: string;                // Avatar image URL
  coins: number;                 // Game currency (starts at 100)
  bio: string;                   // User bio (max 150 chars)
  level: number;                 // User level (optional)
  achievements: string[];        // Achievement list (optional)
  stats: {
    gamesPlayed: number;
    wins: number;
    avgResponseTime: number;
    highestStreak: number;
  };
}
```

---

## 🎨 UI Features

### Login Page

- ✨ Smooth animations
- 🎯 Email validation
- 👁️ Show/hide password
- 💾 Remember me option
- 📱 Fully responsive
- ⚠️ Error messages
- 🔗 Link to signup

### Signup Page

- 📋 2-step process (progressive disclosure)
- ✅ Real-time validation
- 🎨 8 avatar options
- 📊 Progress indicator
- 🔒 Password strength indicator
- 💪 Terms agreement checkbox
- 📱 Fully responsive

### Profile Page

- 👤 Avatar display with hover
- 📊 Stats cards with gradients
- 🏆 Achievements carousel
- 💰 Coins display
- ✎ Edit button with modal
- 🎨 Avatar picker
- 📝 Bio editor
- 💾 Real-time save feedback

### Navbar

- 🏠 Logo with hover effect
- 🧭 Navigation links (logged-in only)
- 💰 Coins counter
- 👤 User dropdown menu
- 🚪 Logout button
- 📱 Mobile-responsive

---

## 🔑 Key Features

### Security

- ✅ Firebase Auth (no password storage)
- ✅ Firestore rules-based access control
- ✅ Protected routes (auth guards)
- ✅ Session persistence
- ✅ Secure logout

### Performance

- ✅ Code splitting
- ✅ Lazy loaded components
- ✅ Optimized animations
- ✅ Minimal bundle size
- ✅ Real-time updates

### User Experience

- ✅ Smooth animations
- ✅ Instant feedback
- ✅ Clear error messages
- ✅ Loading states
- ✅ Mobile-first design

---

## 🛠️ Available Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install Firebase
npm install firebase

# Check for errors
npm run build
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All pages are optimized for each breakpoint.

---

## 🎨 Customization Guide

### Change Theme Colors

Replace color classes throughout components:

```tsx
// Change from indigo to blue
from-indigo-600 → from-blue-600
to-purple-600 → to-cyan-600
```

### Customize Avatars

Edit in `pages/Profile.tsx`:

```typescript
const AVATAR_OPTIONS = [
  "https://your-custom-avatar-url-1",
  "https://your-custom-avatar-url-2",
  // ... more URLs
];
```

### Adjust Animations

Modify Framer Motion props:

```tsx
animate={{ scale: [1, 1.1, 1] }}
transition={{ duration: 2, repeat: Infinity }}
```

### Change Form Validation

Edit `pages/Login.tsx` and `pages/Signup.tsx`:

```typescript
// Adjust min/max lengths
username.length >= 3 && username.length <= 20

// Modify password requirements
/[A-Z]/.test(password) // Requires uppercase
/[0-9]/.test(password) // Requires numbers
```

---

## 🐛 Troubleshooting

### Firebase Config Error

```
Error: firebase/config is not found
```

**Solution**: Verify `config/firebase.ts` exists and config is correct

### Auth Not Persisting

```
User logs in but loses session on refresh
```

**Solution**: Check Firebase config, ensure `onAuthStateChanged` is working

### Firestore Write Failed

```
Error: Permission denied
```

**Solution**: Check Firestore security rules, ensure user is authenticated

### Avatar Not Loading

```
404 or broken image
```

**Solution**: DiceBear API may be down, try refresh or change avatar

### Build Size Too Large

```
warning: chunk size limit exceeded
```

**Solution**: Normal for dev, production builds are minified and smaller

---

## 📚 Dependencies

```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-router-dom": "7.1.1",
  "framer-motion": "11.15.0",
  "firebase": "^9.x or higher"
}
```

---

## 🌐 Deployment

### Vercel

```bash
npm install -g vercel
vercel
# Follow prompts
```

### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

---

## 🎯 Future Enhancements

- [ ] Social login (Google, GitHub)
- [ ] Password reset flow
- [ ] Email verification
- [ ] Avatar upload from file
- [ ] Friend system
- [ ] Achievements system
- [ ] Leaderboard real-time sync
- [ ] Push notifications
- [ ] Two-factor authentication
- [ ] User presence indicators

---

## 📄 Documentation Files

- **QUICK_START.md** - 5-minute setup guide
- **FIREBASE_SETUP.md** - Detailed Firebase configuration
- **README.md** - This comprehensive guide

---

## 🤝 Contributing

Feel free to modify and enhance:

1. Update types in `types.ts`
2. Add new auth methods in `config/authService.ts`
3. Create new pages with protected routes
4. Customize UI components
5. Add new Firestore collections

---

## 📞 Support

- Check browser console for errors
- Verify Firebase config
- Test with demo credentials
- Review error messages carefully
- Check Firestore rules

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🎉 Ready to Launch!

Your Quiz Vortex app is now equipped with:

- ✅ Professional authentication
- ✅ User profile management
- ✅ Beautiful, modern UI
- ✅ Cloud data persistence
- ✅ Protected routes
- ✅ Real-time sync

**Start the dev server and watch the magic happen!** 🌪️⚡

```bash
npm run dev
```

Visit: http://localhost:5173

---

Made with 💜 for Quiz Vortex
