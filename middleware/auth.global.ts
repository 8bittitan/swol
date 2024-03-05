import { useUser } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();

  if (user.value) return;

  const { data } = await useFetch("/api/user");

  if (data) {
    user.value = data.value;
  }
});
