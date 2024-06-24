
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Notification from '../Notification';
import { ReactNode, useEffect, useState } from 'react';
import { Notification as NotificationType} from '../sitewide/navbar';
import { useAuth } from '../../context/authProvider/AuthProvider';

TimeAgo.addDefaultLocale(en)

export default function NotificationsDrawer({ open, setOpen}: { open: boolean; setOpen: (open: boolean) => void; }) {
    const [notifications, setNotifications] = useState<ReactNode[]>([]);
    const {isSignedIn} = useAuth();

    useEffect(() => {

        handleRefreshNotifications()


    }, [, isSignedIn]);

    async function handleRefreshNotifications(){
        if(isSignedIn){

            const data = await fetch(import.meta.env.VITE_BASE_URL + "prompt/", {
                method: "GET",
                credentials: 'include',
            })
            .then(res => {
                console.log("status: ", res.status)
                if(res.status !== 200){
                    throw new Error("Access Denied")
                }
                return res
            })
            .then(data => {
                return data.json()
            }).then((data) => {
                return data
    
            }).catch(err => {
    
                console.log(err)
            })

            setNotifications(data.map((notification) => (
                <Notification key={notification.time} notification={notification} />
            )));

        }
        else{
            setNotifications([]);
        }
    }


    return (
        <Transition show={open}>
            <Dialog className="relative z-10" onClose={setOpen}>
                <TransitionChild
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 ">
                                            <div className="flex items-start justify-between px-6 border-b-[1px] border-gray-400 pb-4">
                                                <DialogTitle className="text-lg font-medium text-gray-50">Notifications</DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button className="relative m-1 p-2 text-gray-200 hover:text-gray-300" onClick={handleRefreshNotifications}>

                                                        <ArrowPathIcon className="h-6 w-6" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="relative m-1 p-2 text-gray-200 hover:text-gray-300"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <div className="flow-root ">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-400 border-b-[1px] border-gray-400">
                                                        {
                                                            notifications
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div >
                </div >
            </Dialog >
        </Transition >
    )
}
