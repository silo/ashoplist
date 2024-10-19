<template>
    <div class="flex min-h-screen w-full flex-col">
      <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
    <h1>TODO</h1>
    <Input
      type="text"
      v-model="newItem"
      @keyup.enter="createNewShoppingList"
    />
    <Button @click="createNewShoppingList">Create new shopping list</Button>

    <h2>Shopping List</h2>
    <ol>
      <li v-for="item in listStore.shoppingList" :key="item.id">
        <span>{{ item }}</span>
        <button @click="listStore.removeFromList(item.id)">Remove</button>
        <button><RouterLink :to="{name:'shoppingList', params: {id: item.id}}">Go to list</RouterLink></button>
      </li>
    </ol>
      </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useListStore } from "@/store/listStore";
import { useUUID } from '@/utils/uuid'
import { RouterLink } from "vue-router";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";

const listStore = useListStore();
const newItem = ref("");
const createNewShoppingList = () => {
  console.log("Creating new shopping list");
  if(!newItem.value) return;
  listStore.addToShoppingList(newItem.value);
  newItem.value = "";
};
</script>

<style lang="scss" scoped>

</style>