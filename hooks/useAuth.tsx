"use client";

import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import { collection, doc, getDoc, getDocs, query, setDoc, where, limit, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

interface AuthProviderProps {
  children: React.ReactNode
}


interface CustomUser extends User {
  subscription?: boolean,
  subPlan?: string | undefined,
  created?: string,
  cancelled?: string,
}

interface IAuth {
  user: CustomUser | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  error: string | null
  loading: boolean
  setSubscription: (subPlan:string | undefined, state: boolean) => {}
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => { },
  signIn: async () => { },
  setSubscription: async () => { },
  logOut: async () => { },
  error: null,
  loading: false
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [intialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<CustomUser | null>(null);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Logged in...
          const userdet = await getUser(user.uid);
          console.log(userdet);

          setUser({
            ...user,
            subscription: userdet?.subscription,
            subPlan: userdet?.subPlan,
            created: userdet?.created,
            cancelled: userdet?.cancelled,
          })
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userData = { email, subscription: false, id: userCredential.user.uid }
        const newUserRef = doc(db, "Users", userCredential?.user?.uid);
        await setDoc(newUserRef, userData);
        setUser({ ...userCredential.user, subscription: userData.subscription })
        router.push('/')
      })
      .catch((err) => {
        setError(err.message)
        alert(err.message)
      })
      .finally(() => setLoading(false))
  }

  const getUser = async (id: string) => {
    const q = query(collection(db, "Users"), where("id", "==", id), limit(1));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data()
  }

  const setSubscription = async (plan: string | undefined, state: boolean) => {
    if (!user) return;
    setLoading(true);
    const userRef = doc(db, "Users", user?.uid);
    const subscribedOn = state ? `${new Date().toDateString()}` : user?.created
    const cancelledOn = !state ? `${new Date().toDateString()}` : ''
    const obj = {
      subscription: state,
      subPlan: plan,
      created: subscribedOn,
      cancelled: cancelledOn
    };

    await updateDoc(userRef, obj)
      .then(() => {
        setUser({ ...user, ...obj });
      })
      .catch(err => alert(err))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userSubStatus = await getUser(userCredential.user.uid)
        console.log('signin--', userSubStatus, userCredential)
        setUser({ 
          ...userCredential.user, 
          subscription: userSubStatus?.subscription,
          subPlan: userSubStatus?.subPlan,
          created: userSubStatus?.created,
          cancelled: userSubStatus?.cancelled
        })
        router.push('/')
      })
      .catch((err) => {
        setError(err.message)
        alert(err.message)
      })
      .finally(() => setLoading(false))
  }

  const logOut = async () => {
    setLoading(true)
    signOut(auth)
      .then(() => setUser(null))
      .catch(err => {
        setError(err.message)
        alert(err.message)
      })
      .finally(() => setLoading(false))
  }

  // const getPlans = async () => {
  //   const docRef = doc(db, "Plans");
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

  const memoizedValue = useMemo(() => ({
    user, signIn, logOut, signUp, error, loading, setSubscription
  }), [user, loading, error])

  return (
    <RecoilRoot>
      <AuthContext.Provider value={memoizedValue}>
        {!intialLoading && children}
      </AuthContext.Provider>
    </RecoilRoot>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}
