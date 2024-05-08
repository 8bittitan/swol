<?php

namespace App\Models;

use App\Enums\WorkoutPlanStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property WorkoutPlanStatusEnum $status
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Exercise> $exercises
 * @property-read int|null $exercises_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\WorkoutPlanFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereUserId($value)
 * @property string|null $begin_date
 * @property string|null $end_date
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereBeginDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkoutPlan whereEndDate($value)
 * @property-read mixed $remaining_weeks
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Log> $logs
 * @property-read int|null $logs_count
 * @mixin \Eloquent
 */
class WorkoutPlan extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'status' => WorkoutPlanStatusEnum::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function exercises(): HasMany
    {
        return $this->hasMany(Exercise::class);
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
