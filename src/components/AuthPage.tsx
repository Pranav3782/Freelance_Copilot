import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowLeft, Zap } from 'lucide-react';
import { auth, db, googleProvider } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { initialProfile } from '../data/mockData';

interface AuthPageProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        try {
          await set(ref(db, `users/${user.uid}/profile`), {
            ...initialProfile,
            name: name || initialProfile.name,
            email: user.email,
          });
        } catch {
          // Non-fatal
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      // Persist session across page reloads
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Attempt RTDB profile save — non-fatal if rules not yet set
      try {
        const profileRef = ref(db, `users/${user.uid}/profile`);
        const snapshot = await get(profileRef);
        if (!snapshot.exists()) {
          await set(profileRef, {
            ...initialProfile,
            name: user.displayName || initialProfile.name,
            email: user.email,
            avatarUrl: user.photoURL || initialProfile.avatarUrl,
          });
        }
      } catch {
        // Non-fatal — RTDB rules may not allow writes yet
      }
      onSuccess();
    } catch (err: any) {
      // Ignore user-cancelled popup
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        setError(err.message || 'Could not sign in with Google. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#050505] text-white p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full bg-[#6F86F5]/20 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full bg-[#FFD51F]/10 blur-3xl" />
        </div>

        <div className="relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to FreelanceOS
          </button>
        </div>

        <div className="relative space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6F86F5] flex items-center justify-center border-2 border-white/20">
              <Sparkles className="w-6 h-6 text-[#FFD51F]" />
            </div>
            <span className="text-2xl font-black tracking-tight">FreelanceOS</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight">
              Win more projects.<br />
              <span className="text-[#FFD51F]">Work smarter.</span>
            </h1>
            <p className="text-white/70 text-lg font-medium leading-relaxed max-w-sm">
              AI-native opportunity intelligence that evaluates fit, detects risks, and writes winning proposals in seconds.
            </p>
          </div>

          <div className="space-y-3">
            {[
              'AI scores every project for your profile fit',
              'Detects hidden scope traps & red-flag clients',
              'Generates truth-checked, winning proposals',
              'Full Kanban pipeline to track applications',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-sm font-semibold text-white/90">
                <div className="w-5 h-5 rounded-full bg-[#FFD51F] flex items-center justify-center shrink-0">
                  <Zap className="w-3 h-3 text-[#050505]" />
                </div>
                {feat}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-white/30 text-xs font-medium">
          © 2026 FreelanceOS · Built for serious freelancers
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0">
        {/* Mobile back button */}
        <div className="w-full max-w-md mb-6 lg:hidden">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#050505]/60 hover:text-[#050505] text-sm font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#050505] tracking-tight">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-sm text-[#050505]/60 font-medium">
              {isSignUp
                ? 'Start analyzing freelance opportunities with AI.'
                : 'Sign in to your FreelanceOS workspace.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Google button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white text-[#050505] font-black text-sm border-2 border-[#050505] shadow-retro hover:bg-[#F7F7F5] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <svg className="w-5 h-5 animate-spin text-[#6F86F5]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {isGoogleLoading ? 'Redirecting to Google…' : 'Continue with Google'}
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t-2 border-[#050505]/10" />
            <span className="flex-shrink-0 px-4 text-xs font-black text-[#050505]/40 uppercase">or</span>
            <div className="flex-grow border-t-2 border-[#050505]/10" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#050505]/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/30 focus:outline-none focus:ring-2 focus:ring-[#6F86F5] transition"
                    placeholder="John Doe"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-black text-[#050505]/70 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#050505]/40 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/30 focus:outline-none focus:ring-2 focus:ring-[#6F86F5] transition"
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#050505]/70 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#050505]/40 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder:text-[#050505]/30 focus:outline-none focus:ring-2 focus:ring-[#6F86F5] transition"
                  placeholder={isSignUp ? 'Min 6 characters' : '••••••••'}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3.5 rounded-2xl bg-[#050505] text-white font-black text-sm border-2 border-[#050505] shadow-retro hover:bg-[#6F86F5] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait…' : isSignUp ? 'Create Free Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-xs text-[#050505]/60 font-semibold">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
              className="font-black text-[#6F86F5] hover:underline cursor-pointer"
            >
              {isSignUp ? 'Sign in' : 'Create one free'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
