<?php

namespace App\Actions;

use App\Models\Exercise;
use App\Models\Routine;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

const CACHE_TTL = 60 * 60 * 24; // 24 hours

class GetRoutingExercisesAction
{
    public function handle(Routine $routine, int $userId): Collection
    {
        $routineId = $routine->id;

        return Cache::remember("{$userId}:routine-{$routineId}-exercises", CACHE_TTL, function () use ($routine) {
            $exercise_ids = $routine->routineExercises()->select('exercise_id')->get()->map(function ($exercise) {
                return $exercise['exercise_id'];
            })->toArray();

            return Exercise::whereIn('id', $exercise_ids)->get();
        });
    }
}
