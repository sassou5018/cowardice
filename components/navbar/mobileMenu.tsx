'use client'

import { Menu } from '@headlessui/react'
import pb from '@/pocketbase'
import { useRouter } from 'next/navigation'
export default function MobileMenu() {
    const router = useRouter();
    const logout = async () => {
        pb.authStore.clear();
        router.push('/login');
    }
  return (
    <Menu>
      <Menu.Button><a>Menu</a></Menu.Button>
      <Menu.Items className="grid grid-rows-4 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 bg-stone-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-stone-300'}`}
              href="#"
            >
              Write
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-stone-300'}`}
              href="#"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div className={`${active && 'bg-stone-300'} cursor-pointer`} onClick={logout}>
              Sign Out
            </div>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75 cursor-default">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}