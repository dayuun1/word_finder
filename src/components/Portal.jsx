import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, portalId = 'portal-root' }) => {
  const portalRoot = document.getElementById(portalId);
  
  useEffect(() => {
    if (!document.getElementById(portalId)) {
      const div = document.createElement('div');
      div.id = portalId;
      document.body.appendChild(div);
    }
  }, [portalId]);

  if (!portalRoot) return null;
  
  return createPortal(children, portalRoot);
};

export default Portal;