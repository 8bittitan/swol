<?php

namespace App\Enums;

enum RoutineStatusEnum: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public static function toArray(): array
    {
        return array_column(RoutineStatusEnum::cases(), 'value');
    }
}
