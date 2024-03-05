<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

type Props = {
  refreshWorkouts: () => void;
};

const props = defineProps<Props>();

const exerciseTypes = [
  { label: "Push", value: "push" },
  { label: "Pull", value: "pull" },
  { label: "Legs", value: "legs" },
  { label: "Cardio", value: "cardio" },
];

const schema = z.object({
  exercise: z.string(),
  exerciseType: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

type Schema = z.infer<typeof schema>;

const formState = reactive({
  exercise: undefined,
  exerciseType: undefined,
});

const form = ref<HTMLFormElement>();

const addEntry = async (event: FormSubmitEvent<Schema>) => {
  const resp = await $fetch("/api/workouts", {
    method: "POST",
    body: JSON.stringify({
      exercise: event.data.exercise,
      exerciseType: event.data.exerciseType.value,
    }),
  });

  if (!resp.success) {
    form.value?.setErrors(resp.errors);

    return;
  }

  props.refreshWorkouts();
};
</script>

<template>
  <UForm
    :schema="schema"
    :state="formState"
    ref="form"
    @submit="addEntry"
    class="flex flex-col space-y-4 max-w-xl"
  >
    <UFormGroup label="Exercise" name="exercise">
      <UInput v-model="formState.exercise" type="text" />
    </UFormGroup>

    <UFormGroup label="Exercise Type" name="exerciseType">
      <USelectMenu
        placeholder="Select type of exercise"
        :options="exerciseTypes"
        v-model="formState.exerciseType"
      />
    </UFormGroup>

    <UButton type="submit" class="self-start">Add workout</UButton>
  </UForm>
</template>
