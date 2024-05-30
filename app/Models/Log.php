<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @property-read \App\Models\Exercise|null $exercise
 * @property-read \App\Models\User|null $user
 * @property-read \App\Models\Routine|null $workout_plan
 * @method static \Database\Factories\LogFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Log newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Log newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Log query()
 * @property int $id
 * @property int $reps
 * @property int $weight
 * @property int $is_warmup
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_id
 * @property int $workout_plan_id
 * @property int $exercise_id
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereExerciseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereIsWarmup($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereReps($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereWorkoutPlanId($value)
 * @property bool $is_bodyweight
 * @method static \Illuminate\Database\Eloquent\Builder|Log whereIsBodyweight($value)
 * @mixin \Eloquent
 */
class Log extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_warmup' => 'boolean',
        'is_bodyweight' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function routine(): BelongsTo
    {
        return $this->belongsTo(Routine::class);
    }

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
