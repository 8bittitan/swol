<?php

use App\Models\Exercise;
use App\Models\Routine;
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
        Schema::create('routine_exercises', function (Blueprint $table) {
            $table->id();

            $table->integer('day_of_week');

            $table->timestamps();

            $table->foreignIdFor(Routine::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Exercise::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routine_exercises');
    }
};
