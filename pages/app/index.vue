<script setup lang="ts">
const { data, refresh } = await useFetch("/api/workouts");
</script>

<template>
  <h1>App page</h1>
  <div>
    <p>Log a new entry</p>
    <WorkoutsCreateWorkoutForm :refresh-workouts="refresh" />
  </div>
  <ul v-if="data">
    <li v-for="workout in data">
      {{ workout.exercise }}
    </li>
  </ul>
</template>
