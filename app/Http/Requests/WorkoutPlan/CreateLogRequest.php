<?php

namespace App\Http\Requests\WorkoutPlan;

use Illuminate\Foundation\Http\FormRequest;

class CreateLogRequest extends FormRequest
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
            'reps' => ['integer', 'required'],
            'weight' => ['integer', 'required'],
            'exercise_id' => ['integer', 'required'],
            'is_warmup' => ['boolean', 'nullable'],
        ];
    }
}
