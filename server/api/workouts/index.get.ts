import db from "~/server/lib/db";

export default defineAuthEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 403,
    });
  }

  const userId = event.context.user.id;

  const workouts = await db.workout.findMany({
    where: {
      userId,
      // [todo) filter by date
    },
  });

  return workouts;
});
