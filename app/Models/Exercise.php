<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property int $workout_plan_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\WorkoutPlan $workout_plan
 * @method static \Database\Factories\ExerciseFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise query()
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereWorkoutPlanId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Log> $logs
 * @property-read int|null $logs_count
 * @mixin \Eloquent
 */
class Exercise extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function workout_plan(): BelongsTo
    {
        return $this->belongsTo(WorkoutPlan::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }
}
