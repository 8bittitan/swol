<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExerciseLogApiController extends Controller
{
    public function show(Request $request, int $workoutPlanId, int $exerciseId)
    {
        $logs = Log::orderBy('created_at')
            ->where([
                'user_id' => $request->user()->id,
                'workout_plan_id' => $workoutPlanId,
                'exercise_id' => $exerciseId,
            ])
            ->whereBetween('created_at', [
                Carbon::today()->subWeek(),
                Carbon::today()->endOfDay()
            ])
            ->select('*', DB::raw('DATE(created_at) as created_at'), DB::raw('MAX(weight) as weight'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        return response()->json([
            'success' => true,
            'data' => $logs,
        ]);
    }
}
