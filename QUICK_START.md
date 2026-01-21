# 🚀 Quick Start Guide - Quiz Vortex with Firebase

## ✨ What You Got!

### New Features

- 🔐 **Complete Authentication System** - Firebase Auth integration
- 📝 **Signup Page** - Beautiful 2-step registration with validation
- 🔑 **Login Page** - Sleek login with remember-me option
- 👤 **Profile Management** - Edit avatar, username, bio
- 🎨 **Stunning UI** - Glassmorphism, animations, gradient effects
- 🛡️ **Protected Routes** - Secure pages with auth checks
- 💾 **Cloud Persistence** - Firestore database integration

---

## ⚡ 5-Minute Setup

### 1. **Get Firebase Credentials**

```bash
# Go to: https://firebase.google.com/
# 1. Sign in with Google
# 2. Create new project (name: quiz-vortex)
# 3. Add Web App
# 4. Copy the config object
```

### 2. **Update Firebase Config**

Open `config/firebase.ts` and replace:

```typescript
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};
```

### 3. **Enable Auth in Firebase**

```
Firebase Console → Authentication
→ Sign-in method → Email/Password → Enable
```

### 4. **Create Firestore**

```
Firebase Console → Firestore Database
→ Create Database → Production Mode → Select Region → Create
```

### 5. **Update Firestore Rules**

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

### 6. **Run the App**

```bash
npm install  # If needed
npm run dev
```

---

## 🎯 Main Routes

| URL            | Purpose                            |
| -------------- | ---------------------------------- |
| `/`            | Landing page                       |
| `/login`       | Sign in                            |
| `/signup`      | Create account                     |
| `/profile`     | Your profile (edit mode available) |
| `/lobby`       | Game lobby                         |
| `/leaderboard` | Rankings                           |

---

## 👥 Test Account (Optional)

Create a test account:

- Email: `test@example.com`
- Password: `Test123456`

Or use demo shown on login page.

---

## 📱 Features Breakdown

### **Login Page** 🔑

- Email & password fields
- Show/hide password toggle
- Remember me checkbox
- Demo credentials display
- Beautiful error messages
- Smooth animations

### **Signup Page** 📝

- 2-step process (Info → Password)
- Username validation (3-20 alphanumeric)
- Password strength indicator
- 8 Avatar options
- Progress bar
- Real-time validation

### **Profile Page** 👤

- **View Mode**: Stats, achievements, coins
- **Edit Mode**: Change avatar/username/bio
- Character counters
- Real-time Firebase sync
- Beautiful stat cards with gradients

### **Navbar** 🧭

- Dynamic based on auth state
- User dropdown menu with options
- Coins display
- Avatar with quick access

---

## 🔒 How Auth Works

```
1. User visits app
   ↓
2. Firebase checks if logged in
   ↓
3. IF logged in:
   - Load user profile from Firestore
   - Show dashboard
   - Enable game features
   ↓
4. IF not logged in:
   - Show landing page
   - Redirect to login/signup on protected routes

5. User logs in/signs up:
   - Firebase Auth creates account
   - User document created in Firestore
   - Local state updated
   - Redirect to /lobby
```

---

## 💾 Data Stored (Firestore)

```
/users/{userId}
  ├── id: "firebase-uid"
  ├── username: "YourName"
  ├── email: "your@email.com"
  ├── avatar: "url-to-avatar"
  ├── coins: 100
  ├── bio: "Your bio"
  ├── level: 1
  └── stats: {
      gamesPlayed: 0,
      wins: 0,
      avgResponseTime: 0,
      highestStreak: 0
    }
```

---

## 🎨 UI/UX Highlights

✅ Glassmorphism design (frosted glass effect)
✅ Gradient backgrounds
✅ Smooth Framer Motion animations
✅ Hover effects on buttons
✅ Responsive design (mobile-first)
✅ Dark theme with vibrant accents
✅ Custom cursor effect
✅ Loading animations
✅ Error states with friendly messages
✅ Success feedback

---

## 🐛 Common Issues & Fixes

### **"Firebase not initialized"**

- Check if firebase.ts config is correct
- Ensure apiKey is valid

### **"User data not saving"**

- Check Firestore rules (must allow writes)
- Verify user is authenticated
- Check browser console for errors

### **"Can't login"**

- Verify email/password are correct
- Check that user exists in Firebase
- Ensure Email/Password auth is enabled

### **"Avatar not displaying"**

- Check internet connection
- DiceBear API might be temporarily down
- Try refresh page

### **"Page keeps redirecting to login"**

- Check if auth state is being detected
- Verify Firebase config
- Check console for auth errors

---

## 📦 Files Changed/Added

### New Files

```
config/
├── firebase.ts          # Firebase setup
└── authService.ts       # Auth functions

pages/
├── Login.tsx           # Login UI
└── Signup.tsx          # Signup UI
```

### Modified Files

```
App.tsx                # Added auth flow
types.ts              # Added email, bio, level fields
components/Navbar.tsx # Added logout menu
pages/Profile.tsx     # Added edit feature
pages/Landing.tsx     # Updated CTAs
```

---

## 🚀 Next Steps

1. ✅ Configure Firebase (Done!)
2. ✅ Test login/signup
3. Customize theme colors
4. Add custom avatars
5. Implement leaderboard with Firestore
6. Add achievements system
7. Deploy to production

---

## 📚 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 💡 Pro Tips

1. **Test Auth Flow**: Try signing up, logging out, and logging back in
2. **Check Browser DevTools**: Look for auth errors in console
3. **Monitor Firestore**: Watch user documents being created in real-time
4. **Customize Avatars**: Replace DiceBear URLs with your own images
5. **Use Firestore Emulator**: For local development without real database

---

## 🎯 Features to Explore

- Profile editing with avatar selection
- User dropdown menu in navbar
- Protected routes redirect to login
- Firebase Auth state persistence
- Firestore real-time sync
- Beautiful animations on auth pages

---

## 🎉 You're All Set!

Your authentication system is now ready!

- Try signing up at `/signup`
- Login at `/login`
- Edit your profile at `/profile`
- Logout from the dropdown menu

**Happy coding! 🌪️⚡**
