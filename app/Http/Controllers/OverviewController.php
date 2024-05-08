<?php

namespace App\Http\Controllers;

use App\Enums\WorkoutPlanStatusEnum;
use App\Models\WorkoutPlan;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function index()
    {
        $plans = WorkoutPlan::whereUserId(auth()->id())
            ->whereStatus(WorkoutPlanStatusEnum::ACTIVE)
            ->get()
            ->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'description' => $plan->description,
                    'status' => $plan->status,
                    'begin_date' => $plan->begin_date,
                    'end_date' => $plan->end_date,
                    'remaining_weeks' => $plan->remaining_weeks,
                ];
            });

        return Inertia::render('Overview', [
            'plans' => $plans,
        ]);
    }
}
