<?php

use App\Models\User;

it('should not render for logged out user', function () {
    $response = $this->get(route('routines.create'));

    $response->assertRedirect(route('login'));
});

it('should render the create routine page', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->get(route('routines.create'));

    $response->assertStatus(200);
});

it('should allow user to create a routine', function () {
    $response = $this->actingAs(User::factory()->create())->post(route('routines.store'), [
        'name' => 'Test Routine',
        'description' => 'Test Routine Description',
        'status' => 'active',
        'exercises' => [
            [
                'name' => 'Squats',
            ],
            [
                'name' => 'Bench Press',
            ],
        ],
    ]);

    $response->assertRedirect(route('routines.index'));
});

it('should allow user to create a routine with a schedule', function () {
    $response = $this->actingAs(User::factory()->create())->post(route('routines.store'), [
        'name' => 'Test Routine',
        'description' => 'Test Routine Description',
        'status' => 'active',
        'exercises' => [
            [
                'name' => 'Squats',
            ],
            [
                'name' => 'Bench Press',
            ],
        ],
        'begin_date' => '2025-01-01',
        'end_date' => '2025-01-31',
    ]);

    $response->assertRedirect(route('routines.index'));
});
