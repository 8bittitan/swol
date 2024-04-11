<?php

namespace App\Models;

use App\Enums\WorkoutPlanStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
