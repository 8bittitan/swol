<?php

use App\Models\Exercise;
use App\Models\Routine;
use App\Models\User;
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
            $table->boolean('is_bodyweight')->default(false);
            $table->timestamps();

            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Routine::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Exercise::class);
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
