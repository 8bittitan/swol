import type { MetaFunction, LinksFunction, LoaderArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from '@remix-run/react';
import { json } from '@remix-run/node';

import { authenticator } from './utils/auth.server';

import tailwindStyles from './styles/tailwind.css';

import Layout from '~/components/Layout/Layout';

export const links: LinksFunction = () => [
  { href: tailwindStyles, rel: 'stylesheet' },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Screamo Stack',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const matches = useMatches();

  const isInDashboard = matches.some((match) =>
    match.pathname.includes('dashboard'),
  );

  return (
    <html lang="en" className="h-full bg-gray-200">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-200">
        <Layout user={user} isInDashboard={isInDashboard} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
