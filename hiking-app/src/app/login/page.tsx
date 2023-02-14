import React from "react"
import Image from "next/image"
import Header from './header';

export default function login() {
  return (
    

    <main>
      <Header /> 
        <div className="h-screen">
          <header className="w-full flex items-center justify-start pl-10 pt-10">
            <h1 className="text-3xl font-bold text-green-500">Logo</h1>
          </header>
          <div className="flex h-screen justify-center items-center">
            <img
              src="/bilde_login.jpg"
              alt="login image"
              className="w-1/2 h-70 object-cover mb-10 ml-10 mt-10"
            />
            <div className="w-1/2 ml-10 px-10">
              <div className="child">
                <div className="flex justify-center items-center">
                  <div className="w-96 max-h p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-bold text-green-500">
                      Login
                    </h1>
                    <div className="mt-3">
                      <label className="block text-base mb-2" htmlFor="username">
                        Username
                      </label>
                      <input
                        className="border w-full text-base px-2 py-1"
                        type="text"
                        id="username"
                        placeholder="Enter username..."
                      />
                    </div>
                    <div className="mt-3">
                      <label className="block text-base mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="border w-full text-base px-2 py-1"
                        type="password"
                        id="password"
                        placeholder="Enter password..."
                      />
                    </div>
                    <div className="mt-5 flex justify-center">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                        type="submit"
                      >
                        Log in
                      </button>
                    </div>
                    <div className="mt-3 text-center text-sm text-gray-500">
                      Don't have an account?{" "}
                      <a href="#" className="font-bold text-green-500 hover:text-green-700">
                        Sign up
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        </main>
      );
    }
    