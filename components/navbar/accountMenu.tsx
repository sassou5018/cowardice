'use client'

import { Menu } from '@headlessui/react'
import pb from '@/pocketbase'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
export default function AccountMenu() {
    const router = useRouter();
    const logout = async () => {
        pb.authStore.clear();
        router.push('/login');
    }
  return (
    <Menu>
      <Menu.Button><a>Account</a></Menu.Button>
      <Menu.Items className="grid grid-rows-3 absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 bg-stone-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <Link
              className={`${active && 'bg-stone-300'}`}
              href="/settings"
            >
              Account settings
            </Link>
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