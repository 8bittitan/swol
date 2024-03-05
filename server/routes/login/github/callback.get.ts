import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import lucia, { github } from "~/server/lib/auth";
import db from "~/server/lib/db";

type GithubUser = {
  id: number;
  login: string;
  avatar_url: string | null;
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oath_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      statusCode: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GithubUser = await githubUserResponse.json();

    const existingUser = await db.user.findFirst({
      where: {
        githubId: githubUser.id,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
      return sendRedirect(event, "/");
    }

    const userId = generateId(15);

    await db.user.create({
      data: {
        id: userId,
        githubId: githubUser.id,
        username: githubUser.login,
        avatar: githubUser.avatar_url,
      },
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
    return sendRedirect(event, "/app");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw createError({
        statusCode: 400,
      });
    }

    throw createError({
      statusCode: 500,
    });
  }
});
