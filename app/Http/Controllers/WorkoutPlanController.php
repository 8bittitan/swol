<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutPlan\CreateWorkoutPlanRequest;
use App\Models\WorkoutPlan;
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
        $planData = $request->safe()->only(['name', 'description', 'status']);
        $exercises = $request->safe()->only(['exercises']);

        $workoutPlan = $request->user()->workout_plans()->create($planData);
        $workoutPlan->exercises()->createMany($exercises['exercises']);

        return redirect(route('plans.index'));
    }

    public function show(int $workoutPlanId, Request $request): Response
    {
        $workoutPlan = WorkoutPlan::whereUserId($request->user()->id)->whereId($workoutPlanId)->first();

        return Inertia::render('WorkoutPlans/Show', ['workoutPlan' => $workoutPlan]);
    }
}
