import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User as FirebaseUser,
  AuthError,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { User } from '../types';

const DEFAULT_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Annie',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Avery',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Axel',
];

export const authService = {
  // Sign up with email and password
  async signup(email: string, password: string, username: string): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      const randomAvatar = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
      
      await updateProfile(user, { displayName: username });
      
      const userData: User = {
        id: user.uid,
        username,
        email,
        avatar: randomAvatar,
        coins: 100,
        stats: {
          gamesPlayed: 0,
          wins: 0,
          avgResponseTime: 0,
          highestStreak: 0,
        },
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      return userData;
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Signup failed');
    }
  },

  // Sign in with email and password
  async signin(email: string, password: string): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('User profile not found');
      }
      
      return docSnap.data() as User;
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Sign in failed');
    }
  },

  // Sign out
  async signout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Sign out failed');
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, updates);
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Profile update failed');
    }
  },

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },

  // Get user data
  async getUserData(userId: string): Promise<User | null> {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as User) : null;
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Error fetching user data:', authError.message);
      return null;
    }
  },

  // Send password reset email by email
  async sendPasswordResetByEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Failed to send password reset email');
    }
  },

  // Send password reset email by username (lookup email)
  async sendPasswordResetByUsername(username: string): Promise<void> {
    try {
      const usersCol = collection(db, 'users');
      const q = query(usersCol, where('username', '==', username));
      const snap = await getDocs(q);
      if (snap.empty) {
        throw new Error('User not found');
      }
      const data = snap.docs[0].data() as Partial<User>;
      if (!data.email) {
        throw new Error('No email associated with this user');
      }
      await sendPasswordResetEmail(auth, data.email);
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Failed to send password reset email');
    }
  },

  // Verify reset code and return email
  async verifyResetCode(oobCode: string): Promise<string> {
    try {
      const email = await verifyPasswordResetCode(auth, oobCode);
      return email;
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Invalid or expired reset code');
    }
  },

  // Confirm password reset with code and new password
  async confirmPasswordReset(oobCode: string, newPassword: string): Promise<void> {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error: unknown) {
      const authError = error as AuthError;
      throw new Error(authError.message || 'Failed to reset password');
    }
  },
};
