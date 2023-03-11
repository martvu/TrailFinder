'use client';

import React from 'react';
import Image from 'next/image';
import Login from '../components/Login';
import { LoggedOutHoc } from '../utils/HOC';

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/images/bg_trailfinder.png"
        alt="login"
        width={800}
        height={800}
        className="w-1/2 object-cover mb-0 ml-10 mt-10 rounded-lg hidden md:block "
      />
      <div className="flex flex-col items-center w-full md:w-1/2 ml-10 px-10">
        <Image
          src="/images/trailfinder_logo_simple.png"
          alt="logo"
          width={100}
          height={100}
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

export default LoggedOutHoc(LoginPage);
