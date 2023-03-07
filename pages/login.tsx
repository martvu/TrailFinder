'use client';

import React, { useState } from 'react';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/navigation';
import Login from '../components/Login';

export default function LoginPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  if (currentUser) {
    router.push('/home');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="/images/bg_trailfinder.png"
        alt="login"
        className="w-1/2 object-cover mb-0 ml-10 mt-10 rounded-lg hidden md:block "
      />
      <div className="flex flex-col items-center w-full md:w-1/2 ml-10 px-10">
        <img
          src="/images/trailfinder_logo_simple.png"
          alt="logo"
          className="w-20 pb-5"
        />
        <h1 className="text-2xl md:text-3xl block text-center font-bold text-secondary pb-5">
          Welcome to TrailFinder!
        </h1>
        <Login />
      </div>
    </div>
  );
}
