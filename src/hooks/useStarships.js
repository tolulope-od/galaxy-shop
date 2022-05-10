import * as React from 'react';
import StarshipsContext from '../context/StarshipsContext.jsx';

const useStarships = () => {
  const starshipsContext = React.useContext(StarshipsContext);

  if (starshipsContext === undefined) {
    return Error("useStarships must be used within a <StarshipsProvider />")
  }

  return starshipsContext;
}

export default useStarships;