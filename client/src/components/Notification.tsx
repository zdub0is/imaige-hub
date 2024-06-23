import { DialogTitle } from "@headlessui/react";
import TimeAgo from "javascript-time-ago";
import { useState } from "react";

export default function Notification({ notification }) {
    const ta = new TimeAgo('en-US');
    const [isApproved, setIsApproved] = useState(notification.isApproved);
    const [isActive, setIsActive] = useState(notification.isActive)

    // prompt: string;
    // isApproved: boolean;
    // userRequested: string;

    async function handleAddJob(e) {
        e.preventDefault();
        // do fetch 
        await fetch(import.meta.env.VITE_BASE_URL + "prompt/addJob", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": notification._id,
                "prompt": notification.prompt,
                "userRequested": notification.userRequested,
                "isApproved": isApproved
            }),
        })
            .then(res => {
                console.log("status: ", res.status)
                if (res.status !== 200) {
                    throw new Error("Access Denied")
                }
                return res
            })
            .then(data => {
                return data.json()
            }).then((data) => {
                console.log(data)
                setIsActive(false);

            }).catch(err => {

                console.log(err)
            })

        return
    }

    function handleChangeIsApproved(e) {
        setIsApproved(e.target.checked)
    }
    console.log(notification);

    return (
        <li key={notification.time} className={`pt-4 pb-3 px-4 flex ${!isActive ? 'bg-gray-800' : ''}`}>
            <div className="flex-shrink-0">
                <div className={`h-10 w-10 flex items-center justify-center rounded-full ${!isActive ? 'bg-rose-200' : 'bg-rose-500'} sm:h-12 sm:w-12`}>
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
                <div className="border-b-2 border-gray-700 mb-3 pb-3">
                    <div className="flex justify-between">
                        <DialogTitle className={`text-sm font-medium ${notification.read ? 'text-gray-300' : 'text-gray-50'}`}>{notification.type}</DialogTitle>
                        <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-gray-200'}`}>{ta.format(notification.time)}</p>
                    </div>
                    <p className={`mt-2 text-sm ${notification.read ? 'text-gray-400' : 'text-gray-200'}`}>{notification.prompt}</p>
                    <p className={`mt-2 text-sm ${notification.read ? 'text-gray-400' : 'text-gray-200'}`}>By: {notification.userRequested} </p>
                </div>
                <div className="mt-1 flex justify-end items-center space-x-2">
                    {/* <a
                    href={notification.href}
                    className={`text-sm font-medium ${notification.read ? 'text-rose-300 hover:text-rose-200' :'text-rose-500 hover:text-rose-400'}`}
                >
                    View
                </a> */}
                    <div>

                        <input disabled={!isActive} type="checkbox" checked={isApproved} onChange={(e) => handleChangeIsApproved(e)} className={`mr-2 text-sm font-medium text-rose-500 hover:text-rose-400`} />
                        <span className={`mr-4 text-sm font-medium text-rose-500 hover:text-rose-400`}>Approve Prompt</span>
                    </div>
                    <button
                        disabled={!isActive || !isApproved}
                        className={`bg-rose-500 text-sm font-medium text-gray-200 hover:text-rose-200 p-2 rounded`}
                        onClick={(e) => handleAddJob(e)}
                    >
                        Add to Queue
                    </button>
                </div>
            </div>
        </li>
    )
}