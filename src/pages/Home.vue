<template>
    <h1>TODO</h1>
    <input
      type="text"
      v-model="newItem"
      @keyup.enter="createNewShoppingList"
    />
    <button @click="createNewShoppingList">Create new shopping list</button>

    <h2>Shopping List</h2>
    <ol>
      <li v-for="item in listStore.shoppingList" :key="item.id">
        <span>{{ item }}</span>
        <button @click="listStore.removeFromList(item.id)">Remove</button>
        <button><RouterLink :to="{name:'shoppingList', params: {id: item.id}}">Go to list</RouterLink></button>
      </li>
    </ol>
</template>

<script setup>
import { computed, ref } from "vue"
import { useListStore } from "@/store/listStore";
import { useUUID } from '@/utils/uuid'
import { RouterLink } from "vue-router";

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