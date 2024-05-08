<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property int $workout_plan_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\WorkoutPlan $workout_plan
 * @method static \Database\Factories\ExerciseFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise query()
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exercise whereWorkoutPlanId($value)
 * @mixin \Eloquent
 */
	class Exercise extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WorkoutPlan> $workout_plans
 * @property-read int|null $workout_plans_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	class User extends \Eloquent {}
}

namespace App\Models{
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
 * @mixin \Eloquent
 * @property-read mixed $remaining_weeks
 */
	class WorkoutPlan extends \Eloquent {}
}

