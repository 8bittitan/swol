import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { GoogleStrategy } from 'remix-auth-google';
import type { UserSession } from '@types';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from '~/env';

import { sessionStorage } from './session.server';
import { findByCredentials, findOrCreateByProfile } from '~/models/user.server';

const authenticator = new Authenticator<UserSession | null>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')?.toString();
    const password = form.get('password')?.toString();

    if (!email || !password) {
      return null;
    }

    const user = await findByCredentials(email, password);

    return user;
  }),
  'credentials',
);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async ({ profile }) => {
      const user = await findOrCreateByProfile(profile);

      return user;
    },
  ),
  'google',
);

export { authenticator };
