import React, { useState } from "react";
import Home from "components/Home";
import { useAuth } from "context/AuthContext";

export default function HomePage() {
  const { currentUser } = useAuth();
	return (
		<div>
      {<Home/>}
    </div>
				
	);
}
