import type { LoaderArgs } from '@remix-run/node';
import { Menu } from '@headlessui/react';
import { json } from '@remix-run/node';
import { Outlet, NavLink, Link, useLoaderData } from '@remix-run/react';
import { RectangleGroupIcon, FireIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';

import { requiresUser } from '~/http.server';
import type { PropsWithChildren } from 'react';

export async function loader({ request }: LoaderArgs) {
  const user = await requiresUser(request);

  return json({ user });
}

const NavItem = ({ path, children }: PropsWithChildren<{ path: string }>) => {
  const getClasses = (isActive: boolean) =>
    cx(
      'flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors',
      { 'bg-gray-900': isActive },
    );

  return (
    <NavLink to={path} end>
      {({ isActive }) => (
        <span className={getClasses(isActive)}>{children}</span>
      )}
    </NavLink>
  );
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <main className="grid grid-cols-[300px_1fr] h-screen">
      <nav className="bg-gray-800 text-white">
        <div className="bg-gray-900 p-6 mb-4">
          <h3 className="text-2xl">SWOL 💪</h3>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <NavItem path="/dashboard">
            <RectangleGroupIcon className="h-9 w-9" /> Dashboard
          </NavItem>
          <NavItem path="exercises">
            <FireIcon className="h-9 w-9" /> Exercises
          </NavItem>
        </div>
      </nav>
      <div>
        <header className="flex justify-end p-6 shadow bg-white">
          <Menu as="div" className="relative ml-3 h-8">
            <Menu.Button>
              <span className="sr-only">Open user menu</span>
              {user.avatar ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.avatar}
                  alt=""
                />
              ) : (
                <span>{user.email}</span>
              )}
            </Menu.Button>

            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left">
                  Settings
                </span>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                  to="/auth/logout"
                >
                  Logout
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
