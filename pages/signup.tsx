'use client';

import React from 'react';
import Signup from 'components/Signup';
import { LoggedOutHoc } from 'utils/HOC';

function SignupPage() {
  return (
    <div>
      <Signup />
    </div>
  );
}

export default LoggedOutHoc(SignupPage);
