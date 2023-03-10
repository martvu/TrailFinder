import Home from 'components/Home';
import React from 'react';
import AuthHoc from 'utils/HOC';

function Index() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default AuthHoc(Index);
