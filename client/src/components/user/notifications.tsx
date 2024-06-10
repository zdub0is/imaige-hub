import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Notification } from '../sitewide/navbar'

TimeAgo.addDefaultLocale(en)

export default function NotificationsDrawer({ open, setOpen, notifications }: { open: boolean; setOpen: (open: boolean) => void; notifications: Notification[]}) {
    const ta = new TimeAgo('en-US')
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
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-200 hover:text-gray-300"
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
                                                        {notifications.map((notification) => (
                                                            <li key={notification.time} className={`pt-4 pb-3 px-4 flex ${notification.read ? 'bg-gray-800' : ''}`}>
                                                                <div className="flex-shrink-0">
                                                                    <div className={`h-10 w-10 flex items-center justify-center rounded-full ${notification.read ? 'bg-rose-200' : 'bg-rose-500'} sm:h-12 sm:w-12`}>
                                                                        {/* Heroicon name: outline/chat-alt */}
                                                                        <svg
                                                                            className="h-6 w-6 text-white"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M12 3c-4.97 0-9 3.13-9 7v4c0 3.87 4.03 7 9 7s9-3.13 9-7v-4c0-3.87-4.03-7-9-7z"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                                                    <div>
                                                                        <div className="flex justify-between">
                                                                            <DialogTitle className={`text-sm font-medium ${notification.read ? 'text-gray-300' :'text-gray-50'}`}>{notification.title}</DialogTitle>
                                                                            <p className={`text-sm ${notification.read ? 'text-gray-400' :'text-gray-200'}`}>{ta.format(notification.time)}</p>
                                                                        </div>
                                                                        <p className={`mt-2 text-sm ${notification.read ? 'text-gray-400' :'text-gray-200'}`}>{notification.message}</p>
                                                                    </div>
                                                                    <div className="mt-1 flex justify-end space-x-2">
                                                                        <a
                                                                            href={notification.href}
                                                                            className={`text-sm font-medium ${notification.read ? 'text-rose-300 hover:text-rose-200' :'text-rose-500 hover:text-rose-400'}`}
                                                                        >
                                                                            View
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
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
