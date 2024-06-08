<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $day_of_week
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $routine_id
 * @property int $exercise_id
 * @property-read \App\Models\Exercise $exercise
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Log> $logs
 * @property-read int|null $logs_count
 * @property-read \App\Models\Routine $routine
 *
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise whereDayOfWeek($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise whereExerciseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise whereRoutineId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoutineExercise whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class RoutineExercise extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }

    public function routine(): BelongsTo
    {
        return $this->belongsTo(Routine::class);
    }
}
