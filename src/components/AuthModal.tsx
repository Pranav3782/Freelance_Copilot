import React, { useState, useEffect } from 'react';
import { X, Sparkles, Mail, Lock, User } from 'lucide-react';
import { auth, db, googleProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { initialProfile } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(true); // Default to Sign Up
  const [name, setName] = useState(''); // Added name field
  const [email, setEmail] = useState(''); // Clear mock data
  const [password, setPassword] = useState(''); // Clear mock data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Create default profile in RTDB
        await set(ref(db, `users/${user.uid}/profile`), {
          ...initialProfile,
          name: name || initialProfile.name,
          email: user.email
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Attempt to pre-fill profile — non-fatal if RTDB rules aren't set yet
      try {
        const profileRef = ref(db, `users/${user.uid}/profile`);
        const snapshot = await get(profileRef);
        if (!snapshot.exists()) {
          await set(profileRef, {
            ...initialProfile,
            name: user.displayName || initialProfile.name,
            email: user.email,
            avatarUrl: user.photoURL || initialProfile.avatarUrl
          });
        }
      } catch (dbErr: any) {
        // Firebase RTDB permission error — auth still succeeded, proceed
        console.warn('[Firebase RTDB] Profile read/write skipped:', dbErr?.message);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(err.message || 'An error occurred during Google authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-[28px] border-2 border-[#050505] shadow-retro-lg p-5 sm:p-8 text-[#050505] animate-in slide-in-from-top duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white text-[#050505] hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#6F86F5] text-white flex items-center justify-center font-black border-2 border-[#050505] shadow-retro-sm">
              <Sparkles className="w-6 h-6 text-[#FFD51F]" />
            </div>
            <h3 className="text-2xl font-black text-[#050505] tracking-tight">
              {isSignUp ? 'Create your FreelanceOS account' : 'Welcome back to FreelanceOS'}
            </h3>
            <p className="text-xs text-[#050505]/75 font-semibold">
              {isSignUp
                ? 'Start analyzing opportunities and writing truth-checked proposals in seconds.'
                : 'Log in to continue managing your opportunity pipeline and intelligence reports.'}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-[#050505] font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile hover:bg-[#F7F7F5] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t-2 border-[#050505]/10"></div>
              <span className="flex-shrink-0 px-4 text-xs font-black text-[#050505]/40 uppercase">or continue with email</span>
              <div className="flex-grow border-t-2 border-[#050505]/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#050505]/60 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/40 focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                    placeholder="John Doe"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-black text-[#050505]/70 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#050505]/60 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/40 focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#050505]/70 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#050505]/60 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/40 focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#050505] text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile hover:bg-[#6F86F5] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : (isSignUp ? 'Create Free Account' : 'Sign In')}
            </button>
          </form>
          </div>

          <div className="text-center text-xs text-[#050505]/70 font-semibold">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-black text-[#6F86F5] hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-black text-[#6F86F5] hover:underline cursor-pointer"
                >
                  Create one free
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
