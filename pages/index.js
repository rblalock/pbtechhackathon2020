import React, { useEffect } from 'react';

import { useUser } from '../data/firebase';

const Site = () => {
  const { user, loading } = useUser();

  return (
    <>
      Site goes here
    </>
  );
};

export default Site;
