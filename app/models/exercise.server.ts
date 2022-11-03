import { endOfDay, startOfDay } from 'date-fns';

import { prisma } from '~/utils/db.server';

export const getExercisesForUser = async (
  userId: string,
  forDate: Date = new Date(),
) => {
  try {
    return await prisma.exercise.findMany({
      where: {
        userId,
        createdAt: { gte: startOfDay(forDate), lte: endOfDay(forDate) },
      },
    });
  } catch (err) {
    return [];
  }
};
