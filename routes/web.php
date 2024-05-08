<?php

use App\Http\Controllers\LogController;
use App\Http\Controllers\OverviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkoutPlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/overview', [OverviewController::class, 'index'])->name('overview');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/plans', [WorkoutPlanController::class, 'index'])->name('plans.index');
    Route::get('/plans/new', [WorkoutPlanController::class, 'create'])->name('plans.create');
    Route::post('/plans/new', [WorkoutPlanController::class, 'store'])->name('plans.store');
    Route::get('/plans/{id}', [WorkoutPlanController::class, 'show'])->name('plans.show');

    Route::get('/plans/{workoutPlan}/log', [LogController::class, 'create'])->name('logs.create');
    Route::post('/plans/{workoutPlan}/log', [LogController::class, 'store'])->name('logs.store');
});

require __DIR__.'/auth.php';
