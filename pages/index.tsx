import Home from 'components/Home';
import React from 'react';
import { LoggedInHoc } from 'utils/HOC';

function Index() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default LoggedInHoc(Index);
