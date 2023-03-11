'use client';

import EditProfile from 'components/EditProfile';
import Profile from 'components/Profile';
import React, { useState } from 'react';
import { LoggedInHoc } from 'utils/HOC';

function ProfilePage() {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? <EditProfile setEdit={setEdit} /> : <Profile setEdit={setEdit} />}
    </div>
  );
}

export default LoggedInHoc(ProfilePage);
