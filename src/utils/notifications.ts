import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { getRandomPointer } from '@/data/pointers';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    const result = await LocalNotifications.checkPermissions();
    return result.display === 'granted';
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

export const scheduleDailyPointerNotifications = async () => {
  try {
    // Cancel any existing notifications first
    const notificationsToCancel = Array.from({ length: 144 }, (_, i) => ({ id: i + 1 }));
    await LocalNotifications.cancel({ notifications: notificationsToCancel });

    const now = new Date();
    const notifications: ScheduleOptions['notifications'] = [];

    // Schedule notifications every 10 minutes (144 notifications per day)
    const intervalsPerDay = 144; // 24 hours * 60 minutes / 10 minutes = 144

    for (let i = 0; i < intervalsPerDay; i++) {
      const pointer = getRandomPointer();
      const minutes = (i * 10) % 60;
      const hours = Math.floor((i * 10) / 60);

      const scheduleTime = new Date();
      scheduleTime.setHours(hours, minutes, 0, 0);

      // If the time has passed today, schedule for tomorrow
      if (scheduleTime <= now) {
        scheduleTime.setDate(scheduleTime.getDate() + 1);
      }

      notifications.push({
        id: i + 1,
        title: 'Self-Inquiry Pointer',
        body: pointer.text,
        schedule: {
          on: {
            hour: hours,
            minute: minutes
          },
          allowWhileIdle: true,
          repeats: true,
        },
        smallIcon: 'ic_launcher',
        iconColor: '#8B5CF6',
        sound: undefined,
        attachments: undefined,
        actionTypeId: '',
        extra: null,
      });
    }

    await LocalNotifications.schedule({ notifications });
    console.log('Scheduled notifications every 10 minutes (144 per day)');
    return true;
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    return false;
  }
};

export const cancelAllNotifications = async () => {
  try {
    const notificationsToCancel = Array.from({ length: 144 }, (_, i) => ({ id: i + 1 }));
    await LocalNotifications.cancel({ notifications: notificationsToCancel });
    console.log('Cancelled all notifications');
  } catch (error) {
    console.error('Error cancelling notifications:', error);
  }
};
