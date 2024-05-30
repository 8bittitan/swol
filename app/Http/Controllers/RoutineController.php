<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutPlan\CreateWorkoutPlanRequest;
use App\Models\Routine;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoutineController extends Controller
{
    public function index(Request $request): Response
    {
        $routines = $request->user()->routines()->get();

        return Inertia::render('Routine/Index', ['routines' => $routines]);
    }

    public function create(): Response
    {
        return Inertia::render('Routine/Create');
    }

    public function store(CreateWorkoutPlanRequest $request): RedirectResponse
    {
        $planData = $request->safe()->only(['name', 'description', 'status']);
        $exercises = $request->safe()->only(['exercises']);

        $routine = $request->user()->routines()->create($planData);
        $routine->exercises()->createMany($exercises['exercises']);

        return redirect(route('routines.index'));
    }

    public function show(int $routineId, Request $request): RedirectResponse | Response
    {
        $routine = Routine::where([
            'user_id' => $request->user()->id,
            'id' => $routineId,
        ])->with('exercises')->first();

        if (! $routine) {
            return redirect(route('routines.index'));
        }

        return Inertia::render('Routine/Show', [
            'routine' => $routine,
            'exercises' => $routine->exercises,
        ]);
    }
}
