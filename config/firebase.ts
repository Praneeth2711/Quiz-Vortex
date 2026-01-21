import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Replace with your Firebase config
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5JdMuWBIHxg2OccqRBRiMMNkn7A0sI0g",
  authDomain: "quiz-vortex.firebaseapp.com",
  projectId: "quiz-vortex",
  storageBucket: "quiz-vortex.firebasestorage.app",
  messagingSenderId: "192561938854",
  appId: "1:192561938854:web:1f7a41627a0ef5bab0cf67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;
