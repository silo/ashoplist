<template>
      <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <RouterView />

  </main>

</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style lang="scss">
input,
button,
ol {
  font-size: 1rem;
  list-style-type: decimal;
}
</style>
