<template>
  <main>
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
