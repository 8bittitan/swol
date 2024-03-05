import { EventHandler, EventHandlerRequest } from "h3";
import { Session, User, verifyRequestOrigin } from "lucia";
import lucia from "~/server/lib/auth";

const defineAuthEventHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    if (event.method !== "GET") {
      const originHeader = getHeader(event, "Origin") ?? null;
      //? NOTE: You may need to use `X-Forwarded-Host` instead
      const hostHeader = getHeader(event, "Host") ?? null;
      if (
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader])
      ) {
        return event.node.res.writeHead(403).end();
      }
    }

    try {
      const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
      if (!sessionId) {
        event.context.session = null;
        event.context.user = null;
      } else {
        console.log("querying user data");
        const { session, user } = await lucia.validateSession(sessionId);

        if (session && session.fresh) {
          appendResponseHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
          );
        }
        if (!session) {
          appendResponseHeader(
            event,
            "Set-Cookie",
            lucia.createBlankSessionCookie().serialize()
          );
        }

        event.context.session = session;
        event.context.user = user;
      }

      const response = await handler(event);

      return response;
    } catch (err) {
      return { err };
    }
  });

export default defineAuthEventHandler;

declare module "h3" {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}
