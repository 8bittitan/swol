import { ZodError, z } from "zod";

import db from "~/server/lib/db";

const workoutSchema = z.object({
  exercise: z.string(),
  exerciseType: z.enum(["push", "pull", "legs", "cardio"]),
});

export default defineAuthEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 403,
    });
  }

  try {
    const body = await readBody<z.infer<typeof workoutSchema>>(event);
    const data = workoutSchema.parse(body);

    await db.workout.create({
      data: {
        exercise: data.exercise,
        userId: event.context.user.id,
        type: data.exerciseType,
      },
    });

    return { success: true, errors: [] };
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));

      return {
        success: false,
        errors,
      };
    }

    throw createError({
      statusCode: 400,
      message: "Invalid request body",
    });
  }
});
