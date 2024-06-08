<?php

namespace App\Http\Requests\Routine;

use App\Enums\RoutineStatusEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRoutineRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'required'],
            'description' => ['string'],
            'status' => ['string', Rule::enum(RoutineStatusEnum::class)],
            'begin_date' => ['date'],
            'end_date' => ['date', 'after:begin_date'],
            'exercises' => ['required', 'array'],
            'exercises.*.id' => ['integer', 'required'],
            'exercises.*.day_of_week' => ['integer', 'required'],
        ];
    }
}
