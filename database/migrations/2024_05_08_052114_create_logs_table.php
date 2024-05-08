<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->integer('reps');
            $table->integer('weight');
            $table->boolean('is_warmup')->default(false);
            $table->timestamps();

            $table->foreignIdFor(App\Models\User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(App\Models\WorkoutPlan::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(App\Models\Exercise::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
