<?php

namespace App\Http\Controllers;

use App\Actions\CreateRoutineAction;
use App\Actions\GetRoutingExercisesAction;
use App\Http\Requests\Routine\CreateRoutineRequest;
use App\Models\Exercise;
use App\Models\Routine;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoutineController extends Controller
{
    public function __construct(protected GetRoutingExercisesAction $getRoutingExercisesAction, protected CreateRoutineAction $createRoutineAction)
    {
    }

    public function index(Request $request): Response
    {
        $routines = $request->user()->routines()->get();

        return Inertia::render('Routine/Index', ['routines' => $routines]);
    }

    public function create(): Response
    {
        $exercises = Exercise::take(10)->get();

        return Inertia::render('Routine/Create', ['exercises' => $exercises]);
    }

    public function store(CreateRoutineRequest $request): RedirectResponse
    {
        $routineData = $request->safe()->only(['name', 'description', 'status', 'begin_date', 'end_date']);
        $exercises = $request->safe()->only(['exercises']);

        $this->createRoutineAction->handle($request->user(), $routineData, $exercises);

        return redirect(route('routines.index'));
    }

    public function show(int $routineId, Request $request): RedirectResponse|Response
    {
        $userId = $request->user()->id;

        $routine = Routine::where([
            'user_id' => $userId,
            'id' => $routineId,
        ])->first();

        if (! $routine) {
            return redirect(route('routines.index'));
        }

        $exercises = $this->getRoutingExercisesAction->handle($routine, $userId);

        return Inertia::render('Routine/Show', [
            'routine' => $routine,
            'exercises' => $exercises,
        ]);
    }

    public function destroy(int $routineId, Request $request): RedirectResponse
    {
        Routine::destroy([
            'id' => $routineId,
            'user_id' => $request->user()->id,
        ]);

        return redirect(route('overview'));
    }
}
