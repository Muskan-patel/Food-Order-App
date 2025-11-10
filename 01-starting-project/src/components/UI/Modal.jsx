import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className='', onClose}) {
  const dialog = useRef();
  
  useEffect(() => {
    const modal = dialog.current;
    
    if (open && modal) {
      modal.showModal();
    }
    
    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [open]);
  
  // Handle clicking on backdrop (optional enhancement)
  const handleBackdropClick = (event) => {
    const dialogDimensions = dialog.current.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      if (onClose) onClose();
    }
  };

  return createPortal(
    <dialog 
      ref={dialog} 
      className={`modal ${className}`}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}