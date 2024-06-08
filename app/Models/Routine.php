<?php

namespace App\Models;

use App\Enums\RoutineStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property RoutineStatusEnum $status
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Exercise> $exercises
 * @property-read int|null $exercises_count
 * @property-read \App\Models\User $user
 *
 * @method static \Database\Factories\RoutineFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Routine newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Routine newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Routine query()
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereUserId($value)
 *
 * @property string|null $begin_date
 * @property string|null $end_date
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereBeginDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Routine whereEndDate($value)
 *
 * @property-read mixed $remaining_weeks
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Log> $logs
 * @property-read int|null $logs_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RoutineExercise> $routineExercises
 * @property-read int|null $routine_exercises_count
 *
 * @mixin \Eloquent
 */
class Routine extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'status' => RoutineStatusEnum::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function routineExercises(): HasMany
    {
        return $this->hasMany(RoutineExercise::class);
    }

    public function exercises(): HasManyThrough
    {
        return $this->hasManyThrough(Exercise::class, RoutineExercise::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }

    public function remainingWeeks(): Attribute
    {
        return new Attribute(get : function () {
            if (! $this->end_date) {
                return null;
            }

            return round(Carbon::now()->diffInWeeks(Carbon::parse($this->end_date)));
        });
    }
}
