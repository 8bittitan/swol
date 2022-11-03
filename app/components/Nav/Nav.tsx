import type { FC } from 'react';
import type { UserSession } from '@types';

import { Link } from '@remix-run/react';
import { Menu } from '@headlessui/react';

import Container from '~/components/Container';

type Props = {
  user: UserSession | null;
};

const Nav: FC<Props> = ({ user }) => {
  return (
    <header className="bg-gray-100" data-test="navigation">
      <Container classes="flex h-16 items-center">
        <Link to={user ? '/dashboard' : '/'}>
          <h2 className="text-lg font-semibold">SWOL 💪</h2>
        </Link>

        <nav className="ml-auto">
          {user ? (
            <div className="relative flex items-center">
              <Link to="/dashboard">Dashboard</Link>

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

                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <span className="block px-4 py-2 text-sm text-gray-700 w-full text-left">
                      Settings
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      to="/auth/logout"
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          ) : (
            <>
              <Link to="/join" className="mr-4">
                Join
              </Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Nav;
