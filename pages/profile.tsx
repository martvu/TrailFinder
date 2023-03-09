'use client';

import EditProfile from 'components/EditProfile';
import Profile from 'components/Profile';
import React, { useState } from 'react';
import AuthHoc from 'utils/HOC';

function ProfilePage() {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {!edit && <Profile setEdit={setEdit} />}
      {edit && <EditProfile setEdit={setEdit} />}
    </div>
  );
}

export default AuthHoc(ProfilePage);
