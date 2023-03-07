'use client';

import EditProfile from 'components/EditProfile';
import Profile from 'components/Profile';
import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser && !edit && <Profile setEdit={setEdit} />}
      {currentUser && edit && <EditProfile setEdit={setEdit} />}
    </div>
  );
}
