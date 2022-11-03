import invariant from 'tiny-invariant';

invariant(process.env.GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_ID must be set');
invariant(process.env.GOOGLE_CLIENT_SECRET, 'GOOGLE_CLIENT_SECRET must be set');
invariant(process.env.GOOGLE_CALLBACK_URL, 'GOOGLE_CALLBACK_URL must be set');

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
