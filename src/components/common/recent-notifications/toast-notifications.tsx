'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from './notification-context';
import './_recent-notifications.scss';

export function ToastNotifications() {
  const { notifications, removeNotification } = useNotifications();

  const getIconForType = (type?: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = (type?: string) => {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      default:
        return 'toast-info';
    }
  };

  return (
    <div className="toast-notifications-container">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`toast-notification ${getTypeClass(notification.type)}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="toast-icon">
              {getIconForType(notification.type)}
            </div>
            <div className="toast-content">
              <p className="toast-message">{notification.message}</p>
            </div>
            <button
              type="button"
              className="toast-close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              aria-label="Close notification"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
