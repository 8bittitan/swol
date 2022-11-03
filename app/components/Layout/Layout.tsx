import { Outlet } from '@remix-run/react';
import type { UserSession } from '@types';
import type { PropsWithChildren } from 'react';

import Container from '../Container';
import Nav from '../Nav/Nav';

type Props = {
  user: UserSession | null;
  isInDashboard: boolean;
};

export default function Layout({
  user,
  isInDashboard,
}: PropsWithChildren<Props>) {
  if (isInDashboard) {
    return <Outlet />;
  }

  return (
    <>
      <Nav user={user} />
      <Container classes="mt-4">
        <Outlet />
      </Container>
    </>
  );
}
