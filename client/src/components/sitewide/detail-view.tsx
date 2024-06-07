// This file will show the slide over and image dialog similar to twitter, showing extra details about the image.
import { ImageObj } from "./image-card";
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

type DetailViewProps = {
    imageObj: ImageObj;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function DetailView({ imageObj, open, setOpen }: DetailViewProps) {
    const { imageLink, prompt, userRequested, dateGenerated } = imageObj;
    return (
        <Transition show={open}>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-600 bg-opacity-75 transition-opacity md:block" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-gray-800 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <img src={imageLink} alt={prompt} className="object-cover object-center" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-3xl font-bold text-gray-50 sm:pr-12">{prompt}</h2>

                                            <section aria-labelledby="information-heading" className="mt-5">
                                                <h3 id="information-heading" className="sr-only">
                                                    Additional information
                                                </h3>
                                                <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-400">Requested by</dt>
                                                        <dd className="text-sm font-semibold text-gray-50">{userRequested}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-400">Generated on</dt>
                                                        <dd className="text-sm font-semibold text-gray-50">{dateGenerated}</dd>
                                                    </div>
                                                </dl>


                                            </section>
                                            {/* TODO: Add click functionality */}
                                            <div className="absolute bottom-4 right-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-50 bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                                                    Download
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