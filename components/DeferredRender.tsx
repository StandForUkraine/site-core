import { ReactElement, ReactNode, useEffect, useState } from 'react';

export const DeferredRender = ({ children }: { children: ReactElement }): ReactElement | null => {
  const [rendered, setRendered] = useState(false);

  useEffect(
    () => {
      setRendered(true);
    },
    [],
  );
  
  if (!rendered) {
    return null;
  }

  return children;
};

export default DeferredRender;
