import { generateState } from "arctic";
import { github } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  setCookie(event, "github_oath_state", state, {
    path: "/",
    secure: !import.meta.dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return sendRedirect(event, url.toString());
});
