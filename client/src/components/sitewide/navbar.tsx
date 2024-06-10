
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import PromptModal from '../user/prompt-modal'
import NotificationsDrawer from '../user/notifications'

const navigation = [
  { name: 'Gallery', href: '#', current: true },
  { name: 'Requests', href: '#', current: false },

]

export type Notification = {
  time: number
  title: string
  message: string
  href: string
  type: string
  urgent: boolean
  read: boolean
}
const SampleNotifications: Notification[] = [
  {
      time: new Date().setHours(new Date().getHours() - 1),
      title: 'New message',
      message: 'You have a new message from Jane Doe.',
      href: '#',
      type: 'message',
      urgent: false,
      read: false,
  },
  {
      time: new Date().setDate(new Date().getDate() - 1),
      title: 'Sales report',
      message: 'Your store’s sales report is ready for download.',
      href: '#',
      type: 'report',
      urgent: false,
      read: true,
  },
  {
      time: new Date().setDate(new Date().getDate() - 3),
      title: 'New customer',
      message: 'You have a new customer.',
      href: '#',
      type: 'customer',
      urgent: true,
      read: false,
  },
  {
      time: new Date().setDate(new Date().getDate() - 7),
      title: 'New feature',
      message: 'You have a new feature request.',
      href: '#',
      type: 'feature',
      urgent: true,
      read: true,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [openPrompt, setOpenPrompt] = useState<boolean>(false)
  const [openNotifications, setOpenNotifications] = useState<boolean>(false)
  return (
    <>
    
    <Disclosure as="nav" className="bg-gray-800">
      
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 justify-between">
                {/* Prompt request button */}
                <button className="bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-rose-600 flex items-center mr-3" onClick={() => setOpenPrompt(true)}>
                  <SparklesIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="ml-2">Request Image</span>
                </button>
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setOpenNotifications(true)}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  {SampleNotifications.length > 0 && <div
    className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block translate-x-1/6 -translate-y-2/5 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-rose-600 text-gray-50 font-bold p-1.5 text-[11px]"/>}
                  <BellIcon className="h-6 w-6" aria-hidden="true"></BellIcon>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
      
    </Disclosure>
    <PromptModal open={openPrompt} setOpen={setOpenPrompt} />
    <NotificationsDrawer open={openNotifications} setOpen={setOpenNotifications} notifications={SampleNotifications} />
    </>
  )
}
