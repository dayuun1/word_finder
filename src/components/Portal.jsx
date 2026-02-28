import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * @category Components
 * @module Portal
 * @memberof Components
 * @description Компонент порталу
 */
/**
 * Рендерить дочірні елементи в DOM-вузол поза поточним деревом компонентів.
 * @param {React.ReactNode} children - Вміст для рендеру 
 * @param {string} [portalId='portal-root']
 * @returns {React.ReactPortal|null} Портал
 * @example <caption>Рендер модального вікна</caption>
 * <Portal>
 *   <div className="modal">Портал</div>
 * </Portal>
 */
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