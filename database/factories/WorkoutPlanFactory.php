<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkoutPlan>
 */
class WorkoutPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->text(10),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'begin_date' => $this->faker->dateTimeBetween('-2 weeks')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('now', '+3 weeks')->format('Y-m-d'),
        ];
    }
}
