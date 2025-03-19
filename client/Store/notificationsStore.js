import {create} from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const notificationStore = (set)=>({
    notificationsCount :0,

    clearNotifications:()=>{ set(()=>({ notifications:0})) },
    updateNotificationCount:(count)=>{set(()=>({notificationsCount:count,}))},
    incrementNotification: () =>  set((state) => ({ notificationCount: state.notificationCount + 1 })),
    decrementNotificationCount:()=>set((state)=>({notificationCount:state.notificationCount-1}))
})
const useNotificationStore = create(
    devtools(persist(notificationStore,{name:"ventricular notifications"}))

)
export default useNotificationStore;