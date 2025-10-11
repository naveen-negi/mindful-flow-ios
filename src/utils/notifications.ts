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
    await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });

    const now = new Date();
    const notifications: ScheduleOptions['notifications'] = [];
    
    // Schedule 4 notifications per day at: 8 AM, 12 PM, 4 PM, 8 PM
    const hours = [8, 12, 16, 20];
    
    hours.forEach((hour, index) => {
      const pointer = getRandomPointer();
      const scheduleTime = new Date();
      scheduleTime.setHours(hour, 0, 0, 0);
      
      // If the time has passed today, schedule for tomorrow
      if (scheduleTime <= now) {
        scheduleTime.setDate(scheduleTime.getDate() + 1);
      }

      notifications.push({
        id: index + 1,
        title: 'Self-Inquiry Pointer',
        body: pointer.text,
        schedule: {
          on: {
            hour: hour,
            minute: 0
          },
          allowWhileIdle: true,
        },
        sound: undefined,
        attachments: undefined,
        actionTypeId: '',
        extra: null,
      });
    });

    await LocalNotifications.schedule({ notifications });
    console.log('Scheduled 4 daily pointer notifications');
    return true;
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    return false;
  }
};

export const cancelAllNotifications = async () => {
  try {
    await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });
    console.log('Cancelled all notifications');
  } catch (error) {
    console.error('Error cancelling notifications:', error);
  }
};
