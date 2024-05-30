<?php

namespace App\Http\Requests\WorkoutPlan;

use App\Enums\RoutineStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateWorkoutPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'required'],
            'description' => ['string'],
            'status' => ['string', Rule::enum(RoutineStatusEnum::class)],
            'exercises' => ['required', 'array'],
            'exercises.*' => ['required', 'array:name'],
            'exercises.*.name' => ['string', 'required'],
        ];
    }
}
