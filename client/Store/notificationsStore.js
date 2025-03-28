import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const notificationStore = (set) => ({
  notificationsCount: 0,

  clearNotifications: () => {
    set(() => ({ notificationsCount: 0 }));
  },
  updateNotificationCount: (count) => {
    set(() => ({ notificationsCount: count }));
  },
  incrementNotification: () => {
    set((prev) => {
      console.log(prev, "prev incresae");
      return { notificationsCount: prev.notificationsCount + 1 };
    });
  },
  decrementNotificationCount: () => {
    set((prev) => {
      console.log(prev);

      return { notificationsCount: prev.notificationsCount - 1 };
    });
  },
});
const useNotificationStore = create(
  devtools(persist(notificationStore, { name: "ventricular notifications" })),
);
export default useNotificationStore;
