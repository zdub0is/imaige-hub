import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useAuth } from '../../context/authProvider/AuthProvider';

export default function SigninModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const { isSignedIn, signin, signout } = useAuth();


    return (
        <Transition show={open}>
            <Dialog className="relative z-10" onClose={setOpen}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto items-center">
                    <div className="flex min-h-full justify-center p-4 text-center sm:p-0 items-center">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-gray-50 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-800">
                                    <div>
                                        {/* Write a Form to request, checkbox that makes a secondary textarea appear, text area below, checkbox below that that if checked causes a dropdown to appear, then a footer that includes a checkbox and a button that is disabled until the checkbox is checked */}
                                        <div className=''>
                                            {/* <div className='flex items-center border-b-gray-700 border-b-2'> */}
                                            <div className='flex items-center'>
                                                <DialogTitle className="text-2xl font-semibold text-gray-50  p-2 pt-4 m-auto">Signin</DialogTitle>

                                            </div>

                                            <div className=" text-center sm:mt-0 sm:text-left px-4 sm:p-4 sm:pb-4 w-9/12 m-auto">
                                                <div className="items-center">



                                                    <div className="flex flex-col my-6">

                                                        <label htmlFor="username" className="ml-2 block text-base text-gray-50 text-left">Username </label>
                                                        <input id="username" name="username" type="text" className="h-10 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" onChange={() => { }} />
                                                    </div>


                                                    <div className="flex flex-col my-6">

                                                        <label htmlFor="username" className="ml-2 block text-base text-gray-50 text-left">Password </label>
                                                        <input id="username" name="username" type="password" className="h-10 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" onChange={() => { }} />
                                                    </div>


                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 bg-gray-700 text-center sm:mt-0 sm:text-left p-4 sm:pb-4 ">
                                            <div className=' w-4/6 m-auto'>

                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-rose-600 border border-transparent rounded-md shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-rose-600 disabled:opacity-50"
                                                    onClick={signin}
                                                >
                                                    Signin
                                                </button>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
