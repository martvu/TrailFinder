import EditProfile from "components/EditProfile";
import Profile from "components/Profile";
import React, { useState } from "react";


export default function HomePage() {
  const [edit, setEdit] = useState(false)
	return (
		<div>
      {!edit && <Profile setEdit={setEdit}/>}
      {edit && <EditProfile setEdit={setEdit}/>}
    </div>
				
	);
}