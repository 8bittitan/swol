<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Routine;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Routine::factory(3)->for($user)->create();
    }
}
