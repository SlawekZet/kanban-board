'use client';
import { auth } from '@/app/lib/firebase-auth/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useAuthState,
} from 'react-firebase-hooks/auth';
import { SignUpForm } from './ui/utils/forms/SignUpForm';
import { SignInForm } from './ui/utils/forms/SingInForm';
import { Button } from './ui/utils/buttons/Button';
import { signOut } from 'firebase/auth';

export default function Home() {
  const [user] = useAuthState(auth);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signup, setSignup] = useState(true);
  const router = useRouter;

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, loggedInUser, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signup) {
      try {
        const res = await createUserWithEmailAndPassword(email, password);
        console.log(res);
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error('An error has occured:', error);
      }
    } else {
      try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log(res?.user.email);
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error('An error has occured:', error);
      }
    }
  };

  const handleSignOut = () => {
    console.log(`${user?.email} has been logged out`);
    if (user) {
      signOut(auth);
    }
  };

  if (error) {
    console.log(error.message);
  }

  const handleSignInToggle = () => {
    signup ? setSignup(false) : null;
  };

  const handleSignupToggle = () => {
    signup ? null : setSignup(true);
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen ">
      <div className="flex flex-col w-[450px] bg-gray1 dark:bg-gray4 items-center text-center gap-4 p-8 rounded-xl shadow-lg">
        <Image
          width={200}
          height={85}
          src="/logo-dark.svg"
          alt="kanban task manager logotype"
          className="pb-8 pt-4"
        />

        <h2 className="text-3xl font-bold mb-6 text-center">
          <Button
            onClick={handleSignupToggle}
            className={`${signup ? 'underline' : null} hover:text-violet2`}
          >
            Sign Up
          </Button>
          /
          <Button
            onClick={handleSignInToggle}
            className={`${!signup ? 'underline' : null} hover:text-violet2`}
          >
            Sign In
          </Button>
        </h2>
        {signup ? (
          <SignUpForm
            password={password}
            email={email}
            setPassword={setPassword}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
          />
        ) : (
          <SignInForm
            password={password}
            email={email}
            setPassword={setPassword}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            error={error?.message}
          />
        )}

        <Link
          href="/demo"
          className="text-sm text-gray5 px-4 py-2 rounded-lg text-center"
        >
          Demo
        </Link>
        {/* <Button
          onClick={handleSignOut}
          className="text-sm text-gray5 px-4 py-2 rounded-lg text-center"
        >
          Sign Out
        </Button> */}
      </div>
    </main>
  );
}
