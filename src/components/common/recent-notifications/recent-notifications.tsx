'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecentSubmissionsAction } from '@/app/actions/notifications';
import './_recent-notifications.scss';

const STORAGE_KEY = 'shown-notifications';
const CHECK_INTERVAL = 30000; // Check every 30 seconds
const MIN_TIME_BETWEEN_NOTIFICATIONS = 60000; // Minimum 1 minute between notifications
const NOTIFICATION_DISPLAY_TIME = 8000; // Show notification for 8 seconds

interface Notification {
  id: string;
  message: string;
  timestamp: number;
  type: 'single' | 'count';
}

export default function RecentNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());

  // Load shown notification IDs from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const ids = new Set(data.ids || []);
        // Clean old entries (older than 24 hours)
        const now = Date.now();
        const validIds = Array.from(ids).filter((id: string) => {
          const parts = id.split('-');
          const timestamp = parseInt(parts[parts.length - 1], 10);
          return now - timestamp < 24 * 60 * 60 * 1000;
        });
        setShownIds(new Set(validIds as string[]));
      } catch (e) {
        console.error('Error loading shown notifications:', e);
      }
    }
  }, []);

  // Save shown notification IDs to localStorage
  const saveShownIds = (ids: Set<string>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ids: Array.from(ids), lastUpdate: Date.now() })
    );
  };

  // Format time ago
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} ${getMinutesWord(diffMins)} назад`;
    if (diffHours < 24) return `${diffHours} ${getHoursWord(diffHours)} назад`;
    return 'сегодня';
  };

  const getMinutesWord = (num: number): string => {
    if (num === 1) return 'минуту';
    if (num >= 2 && num <= 4) return 'минуты';
    return 'минут';
  };

  const getHoursWord = (num: number): string => {
    if (num === 1) return 'час';
    if (num >= 2 && num <= 4) return 'часа';
    return 'часов';
  };

  // Generate notification message
  const generateNotification = (
    submissions: any[],
    lastCheckTime: number
  ): Notification | null => {
    if (submissions.length === 0) return null;

    // Filter submissions that are new (after last check)
    const newSubmissions = submissions.filter(
      (sub) => sub.created_at.getTime() > lastCheckTime
    );

    if (newSubmissions.length === 0) return null;

    // Get the most recent submission
    const mostRecent = newSubmissions[0];
    const timeAgo = formatTimeAgo(mostRecent.created_at);

    // Determine service type
    let serviceType = 'сайт';
    if (mostRecent.website_type) {
      const wt = mostRecent.website_type.toLowerCase();
      if (wt.includes('лендинг')) serviceType = 'лендинг';
      else if (wt.includes('корпоратив')) serviceType = 'корпоративный сайт';
      else if (wt.includes('магазин') || wt.includes('ecommerce'))
        serviceType = 'интернет-магазин';
      else if (wt.includes('визитка')) serviceType = 'сайт-визитку';
      else if (wt.includes('звонок')) serviceType = 'звонок';
    }

    // Create notification ID based on submission ID and type
    const notificationId = `${mostRecent.type}-${
      mostRecent.id
    }-${mostRecent.created_at.getTime()}`;

    // Check if we've already shown this notification
    if (shownIds.has(notificationId)) return null;

    // Single notification
    if (newSubmissions.length === 1) {
      const firstName = mostRecent.name.split(' ')[0];
      return {
        id: notificationId,
        message: `${timeAgo} ${firstName} заказал${getGenderEnding(
          firstName
        )} ${serviceType}`,
        timestamp: Date.now(),
        type: 'single',
      };
    }

    // Multiple notifications - show count (only if 2 or more)
    if (newSubmissions.length >= 2 && newSubmissions.length <= 5) {
      // Get most common service type from new submissions
      const serviceTypes = newSubmissions.map((sub) => {
        if (!sub.website_type) return 'сайт';
        const wt = sub.website_type.toLowerCase();
        if (wt.includes('лендинг')) return 'лендинг';
        if (wt.includes('корпоратив')) return 'корпоративный сайт';
        if (wt.includes('магазин') || wt.includes('ecommerce'))
          return 'интернет-магазин';
        if (wt.includes('визитка')) return 'сайт-визитку';
        if (wt.includes('звонок')) return 'звонок';
        return 'сайт';
      });

      // Find most common service type
      const counts: Record<string, number> = {};
      serviceTypes.forEach((type) => {
        counts[type] = (counts[type] || 0) + 1;
      });
      const mostCommonType =
        Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)) ||
        'сайт';

      return {
        id: notificationId,
        message: `За последние 24 часа ${newSubmissions.length} клиентов заказали ${mostCommonType}`,
        timestamp: Date.now(),
        type: 'count',
      };
    }

    return null;
  };

  const getGenderEnding = (name: string): string => {
    // Simple gender detection based on common Armenian/Russian names
    const femaleEndings = ['а', 'я', 'ия', 'е', 'э'];
    const lastName = name.slice(-1).toLowerCase();
    return femaleEndings.includes(lastName) ? 'а' : '';
  };

  // Check for new submissions
  useEffect(() => {
    let lastCheckTime = Date.now() - CHECK_INTERVAL; // Start checking immediately
    let intervalId: NodeJS.Timeout;

    const checkSubmissions = async () => {
      try {
        const result = await getRecentSubmissionsAction();
        if (result.success && result.data) {
          const notification = generateNotification(result.data, lastCheckTime);

          if (notification) {
            // Check if enough time has passed since last notification
            const lastNotificationTime = notifications[0]?.timestamp || 0;
            const timeSinceLastNotification = Date.now() - lastNotificationTime;

            if (timeSinceLastNotification >= MIN_TIME_BETWEEN_NOTIFICATIONS) {
              setNotifications((prev) => [notification, ...prev.slice(0, 2)]);
              setShownIds((prev) => {
                const newSet = new Set(prev);
                newSet.add(notification.id);
                saveShownIds(newSet);
                return newSet;
              });

              // Auto-remove notification after display time
              setTimeout(() => {
                setNotifications((prev) =>
                  prev.filter((n) => n.id !== notification.id)
                );
              }, NOTIFICATION_DISPLAY_TIME);
            }
          }

          lastCheckTime = Date.now();
        }
      } catch (error) {
        console.error('Error checking submissions:', error);
      }
    };

    // Initial check
    checkSubmissions();

    // Set up interval
    intervalId = setInterval(checkSubmissions, CHECK_INTERVAL);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="recent-notifications-container">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="recent-notification"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notification-icon">🔔</div>
            <div className="notification-content">
              <p className="notification-message">{notification.message}</p>
            </div>
            <button
              className="notification-close"
              onClick={() =>
                setNotifications((prev) =>
                  prev.filter((n) => n.id !== notification.id)
                )
              }
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
