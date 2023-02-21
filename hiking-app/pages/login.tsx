"use client";

import React, { useState } from "react";
import Login from "../components/Login";

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center h-screen">
			<img
				src="/images/bg_trailfinder.png"
				alt="login image"
				className="h-[90%] object-cover mb-0 ml-10 mt-10 rounded-lg"
			/>
			<div className="flex flex-col items-center w-1/2 ml-10 px-10">
				<img
					src="/images/trailfinder_logo_simple.png"
					alt="logo"
					className="w-20 pb-5"
				/>
				<h1 className="text-3xl block text-center font-bold text-secondary pb-5">
					Welcome to TrailFinder!
				</h1>
				<Login />
			</div>
		</div>
	);
}
