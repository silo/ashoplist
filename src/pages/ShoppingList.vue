<template>
  <div v-if="list">
    <h1>Shopping list</h1>
    <p>{{ list }}</p>
    <input type="text" v-model="inputItem" @keyup.enter="addToList(inputItem)" />
    <ul>
      <li v-for="item in searchAutoComplete" :key="item">
        <span>{{ item }}</span>
        <button @click="addToList(item)">Add</button>
      </li>
    </ul>
    <button @click="addToList(inputItem)">Add</button>
    <ul>
      <li v-for="item in list.items" :key="item.id">
        <span>{{ item }}</span>
        <button
          @click="
            useListStore().removeFromList(route.params.id as string, item.id)
          "
        >
          Remove
        </button>
      </li>
    </ul>
    <br>
    <hr>
    <h2>Search List</h2>
    {{ listStore.searchList }}
    <hr>
    {{ inputItem.length > 2 }}
    {{ searchAutoComplete }}
  </div>
</template>

<script setup lang="ts">
import { ListItems, useListStore } from "@/store/listStore";
import { computed, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
const route = useRoute();
const list: Ref = ref<ListItems[]>([]);
const inputItem = ref<string>("");
const listStore = useListStore();

onMounted(() => {
  console.log("ShoppingList mounted");
  list.value = useListStore().getList(route.params.id as any);
  if (!list.value) {
    router.push({ name: "home" });
  }
});

const addToList = (item: string) => {
  if (!item) return;
  listStore.addToList(route.params.id as string, item);
  listStore.addToSearchList(item);
  inputItem.value = "";
};

const searchAutoComplete = computed(() => {
  if(inputItem.value.length < 2) return [];
  return listStore.searchList
    .filter(item => item.toLowerCase().includes(inputItem.value.toLowerCase()))
    .slice(0, 10);
})
</script>

<style lang="scss" scoped></style>
