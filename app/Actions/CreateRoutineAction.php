<?php

namespace App\Actions;

use App\Models\User;

class CreateRoutineAction
{
    public function handle(User $user, array $routineData, array $exercises): void
    {
        $routine = $user->routines()->create($routineData);
        $routine->routineExercises()->createMany(collect($exercises['exercises'])->map(function ($exercise) {
            return [
                'exercise_id' => $exercise['id'],
                'day_of_week' => $exercise['day_of_week'],
            ];
        })->toArray());
    }
}
