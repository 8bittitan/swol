<script setup lang="ts">
import { useUser } from "~/composables/auth";

const user = useUser();
</script>

<template>
  <div v-if="!user">
    <p>Welcome to SWOL</p>
    <p>Please <a href="/login/github">Login with GitHub</a> to continue</p>
  </div>
  <div v-if="user">
    <p>Welcome {{ user.username }}!</p>
    <a href="/logout">Logout</a>
  </div>
</template>
