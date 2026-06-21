import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === "success";
  const bgColor = isSuccess ? "#48c237" : "#fa764e";
  const icon = isSuccess ? "fa-check-circle" : "fa-exclamation-circle";

  return (
    <div className="toast-notification">
      <div className="toast-content" style={{ background: bgColor }}>
        <i className={`fa ${icon}`} aria-hidden="true"></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
