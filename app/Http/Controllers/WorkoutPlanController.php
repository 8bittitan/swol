<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutPlan\CreateWorkoutPlanRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkoutPlanController extends Controller
{
    public function index(Request $request): Response
    {
        $workoutPlans = $request->user()->workout_plans()->get();

        return Inertia::render('WorkoutPlans/Index', ['workoutPlans' => $workoutPlans]);
    }

    public function create(): Response
    {
        return Inertia::render('WorkoutPlans/Create');
    }

    public function store(CreateWorkoutPlanRequest $request)
    {
        $request->user()->workout_plans()->create($request->validated());

        return redirect(route('plans.index'));
    }
}
