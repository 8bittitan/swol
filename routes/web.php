<?php

use App\Http\Controllers\Api\ExerciseLogApiController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OAuthController;
use App\Http\Controllers\OverviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoutineController;
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

Route::get('/auth/{provider:string}', [OAuthController::class, 'redirect'])->name('oauth.redirect');
Route::get('/auth/{provider:string}/callback', [OAuthController::class, 'callback']);

Route::middleware('auth')->group(function () {
    Route::get('/overview', [OverviewController::class, 'index'])->name('overview');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/routines', [RoutineController::class, 'index'])->name('routines.index');
    Route::get('/routines/new', [RoutineController::class, 'create'])->name('routines.create');
    Route::post('/routines/new', [RoutineController::class, 'store'])->name('routines.store');
    Route::get('/routines/{id}', [RoutineController::class, 'show'])->name('routines.show');
    Route::delete('/routines/{id}', [RoutineController::class, 'destroy'])->name('routines.destroy');

    Route::get('/routines/{routine}/log', [LogController::class, 'create'])->name('logs.create');
    Route::post('/routines/{routine}/log', [LogController::class, 'store'])->name('logs.store');

    Route::prefix('api')->group(function () {
        Route::get('/routines/{routineId:int}/{exerciseId:int}/logs', [ExerciseLogApiController::class, 'show'])->name('api.logs.show');
    });
});

require __DIR__.'/auth.php';
