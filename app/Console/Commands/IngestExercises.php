<?php

namespace App\Console\Commands;

use App\Models\Exercise;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class IngestExercises extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'swol:ingest-exercises';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ingest exercises from Open Source repository';

    private string $endpoint = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        try {
            $response = Http::get($this->endpoint);
            $json = $response->json();
        } catch (\Exception $e) {
            $this->error('Failed to fetch exercises from endpoint');

            return;
        }

        $exercises = collect($json)->map(function ($exercise) {
            return [
                'name' => $exercise['name'],
                'force' => $exercise['force'],
                'category' => $exercise['category'],
                'equipment' => $exercise['equipment'],
                'primary_muscles' => implode(',', $exercise['primaryMuscles']),
                'complexity' => $exercise['level'],
            ];
        })->toArray();

        Exercise::upsert($exercises, ['id']);

        $this->info('Successfully ingested exercises');
    }
}
