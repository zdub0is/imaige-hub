import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function PromptModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const [isUrgent, setIsUrgent] = useState<boolean>(false)
    const [isRevision, setIsRevision] = useState<boolean>(false)
    const [acknowledged, setAcknowledged] = useState<boolean>(false)

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
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                            <div className='flex items-center border-b-gray-700 border-b-2'>
                                            <DialogTitle className="text-lg font-semibold text-gray-50 p-4">Request Image</DialogTitle>

                                            </div>

                                            <div className=" text-center sm:mt-0 sm:text-left px-6 pb-4 sm:p-4 sm:pb-4">
                                                <div className="mt-2">
                                                    {/* checkbox */}
                                                    <div className="mb-5">
                                                        {/* textarea */}
                                                        <textarea id="prompt" name="prompt" className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm" placeholder="Please provide a prompt" cols={30} rows={5} />

                                                    </div>
                                                    <div className="flex items-center">
                                                        <input id="urgent" name="urgent" type="checkbox" className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} />
                                                        <label htmlFor="urgent" className="ml-2 block text-sm text-gray-50">Is this an urgent request?</label>
                                                    </div>
                                                    {isUrgent && (
                                                        <div className="mt-2">
                                                            <textarea id="urgent" name="urgent" className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm" placeholder="Please provide a reason for the urgency" />
                                                        </div>
                                                    )}


                                                    

                                                    <div className="mt-2 flex items-center">
                                                        <input id="revision" name="revision" type="checkbox" className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" checked={isRevision} onChange={() => setIsRevision(!isRevision)} />
                                                        <label htmlFor="revision" className="ml-2 block text-sm text-gray-50">Is this a revision?</label>
                                                    </div>
                                                    {isRevision && (
                                                        <div className="mt-2">
                                                            <select id="revision" name="revision" className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
                                                                <option>Minor</option>
                                                                <option>Major</option>
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-4 bg-gray-700">
                                            <div className="flex items-center">
                                                {/* checkbox */}
                                                <input id="acknowledged" name="acknowledged" type="checkbox" className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" checked={acknowledged} onChange={() => setAcknowledged(!acknowledged)} />
                                                <label htmlFor="acknowledged" className="ml-2 block text-xs text-gray-50">I acknowledge that this request follows the code of conduct.</label>
                                            </div>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-rose-600 border border-transparent rounded-md shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-rose-600 disabled:opacity-50"
                                                disabled={!acknowledged}
                                            >
                                                Submit
                                            </button>

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
