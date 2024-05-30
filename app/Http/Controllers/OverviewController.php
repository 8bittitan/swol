<?php

namespace App\Http\Controllers;

use App\Enums\RoutineStatusEnum;
use App\Models\Routine;
use Inertia\Inertia;
use Inertia\Response;

class OverviewController extends Controller
{
    public function index(): Response
    {
        $routines = Routine::whereUserId(auth()->id())
            ->whereStatus(RoutineStatusEnum::ACTIVE)
            ->get()
            ->map(function ($routine) {
                return [
                    'id' => $routine->id,
                    'name' => $routine->name,
                    'description' => $routine->description,
                    'status' => $routine->status,
                    'begin_date' => $routine->begin_date,
                    'end_date' => $routine->end_date,
                    'remaining_weeks' => $routine->remaining_weeks,
                ];
            });

        return Inertia::render('Overview', [
            'routines' => $routines,
        ]);
    }
}
