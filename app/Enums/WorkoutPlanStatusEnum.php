<?php

namespace App\Enums;

enum WorkoutPlanStatusEnum: string
{
    case ACTIVE = 'active';

    public static function toArray(): array
    {
        return array_column(WorkoutPlanStatusEnum::cases(), 'value');
    }
}
