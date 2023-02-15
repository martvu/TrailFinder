"use client";

import React, { useState } from "react";
import Login from "./components/login";

export default function login() {
	return (
		<div className="flex justify-center items-center h-screen">
			<img
				src="/images/bg_trailfinder.png"
				alt="login image"
				className="w-1/2 object-cover mb-0 ml-10 mt-10 rounded-lg"
			/>
			<div className="flex flex-col items-center w-1/2 ml-10 px-10">
				<img
					src="/images/trailfinder_logo_simple.png"
					alt="logo"
					className="w-20 pb-5"
				/>
				<h1 className="text-3xl block text-center font-bold text-primary pb-5">
					Welcome to TrailFinder!
				</h1>
				<Login />
			</div>
		</div>
	);
}
