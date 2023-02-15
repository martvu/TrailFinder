'use client'

import React, { useState } from "react"
import Image from "next/image"
import Header from './header';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Link from "next/link";
import Login from "./components/login";

export default function login() {
  //const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");

  function login() {
    setError("");
    signInWithEmailAndPassword(auth, email, password).then(() => {
      //navigate("/homepage")
    }).catch((e: FirebaseError) => {
      setError(e.message)
    })

  }
  return (
    <main>
      <div className="h-screen">
        <div className="flex justify-center items-center">
          <img
            src="/images/bg_trailfinder.png"
            alt="login image"
            className="w-1/2 object-cover mb-0 ml-10 mt-10 rounded-lg"
          />
          <div className="w-1/2 ml-10 px-10">
            <div className="flex flex-col items-center">
              <img
                  src="/images/trailfinder_logo_simple.png"
                  alt="logo"
                  className="w-20 pb-5"
              />
              <h1 className="text-3xl block text-center font-bold text-primary pb-5" >
                Welcome to TrailFinder!
              </h1>
              <Login/>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
