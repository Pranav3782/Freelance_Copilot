import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { SubscriptionData } from '../types';

interface UseSubscriptionReturn {
  subscription: SubscriptionData | null;
  isPro: boolean;
  isLoading: boolean;
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let dbUnsubscribe: (() => void) | null = null;

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (dbUnsubscribe) {
        dbUnsubscribe();
        dbUnsubscribe = null;
      }

      if (!user) {
        setSubscription(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const subRef = ref(db, `users/${user.uid}/subscription`);

      onValue(subRef, (snapshot) => {
        if (snapshot.exists()) {
          setSubscription(snapshot.val() as SubscriptionData);
        } else {
          setSubscription(null);
        }
        setIsLoading(false);
      });

      dbUnsubscribe = () => off(subRef);
    });

    return () => {
      authUnsubscribe();
      if (dbUnsubscribe) dbUnsubscribe();
    };
  }, []);

  return {
    subscription,
    isPro: subscription?.plan === 'pro',
    isLoading,
  };
}
