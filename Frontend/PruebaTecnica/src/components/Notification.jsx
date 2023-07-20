import React, { useEffect } from "react";
import "../style/Notification.css";

const Notification = ({ texto, mode, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return <>{show && <div className={mode}>{texto}</div>}</>;
};

export default Notification;
