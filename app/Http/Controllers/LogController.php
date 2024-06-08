<?php

namespace App\Http\Controllers;

use App\Actions\GetRoutingExercisesAction;
use App\Http\Requests\Routine\CreateLogRequest;
use App\Models\Routine;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LogController extends Controller
{
    public function __construct(protected GetRoutingExercisesAction $getRoutingExercisesAction)
    {
    }

    public function create(Routine $routine): Response
    {
        $userId = auth()->id();

        $exercises = $this->getRoutingExercisesAction->handle($routine, $userId);

        return Inertia::render('Routine/Log', ['routine' => $routine, 'exercises' => $exercises]);
    }

    public function store(Routine $routine, CreateLogRequest $request): RedirectResponse
    {
        $routine->logs()->create([
            'user_id' => auth()->id(),
            'reps' => $request->get('reps'),
            'weight' => $request->get('weight'),
            'exercise_id' => $request->get('exercise_id'),
            'is_warmup' => $request->get('is_warmup', false),
        ]);

        return redirect()->route('logs.create', $routine->id);
    }
}
