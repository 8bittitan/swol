import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { requiresUser } from '~/http.server';
import { getExercisesForUser } from '~/models/exercise.server';

export async function loader({ request }: LoaderArgs) {
  const user = await requiresUser(request);

  const exercises = await getExercisesForUser(user.id);

  return json({
    exercises,
  });
}

export default function ExercisesPage() {
  const { exercises } = useLoaderData<typeof loader>();

  console.dir(exercises);

  return <h1>Exercises Page</h1>;
}
