<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutPlan\CreateLogRequest;
use App\Models\WorkoutPlan;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LogController extends Controller
{
    public function create(WorkoutPlan $workoutPlan): Response
    {
        $exercises = $workoutPlan->exercises;

        return Inertia::render('WorkoutPlans/Log', ['workout_plan' => $workoutPlan, 'exercises' => $exercises]);
    }

    public function store(WorkoutPlan $workoutPlan, CreateLogRequest $request): RedirectResponse
    {
        $workoutPlan->logs()->create([
            'user_id' => auth()->id(),
            'reps' => $request->get('reps'),
            'weight' => $request->get('weight'),
            'exercise_id' => $request->get('exercise_id'),
            'is_warmup' => $request->get('is_warmup', false),
        ]);

        return redirect()->route('logs.create', $workoutPlan->id);
    }
}
