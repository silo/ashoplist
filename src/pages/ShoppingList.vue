<template>
  <div v-if="list">
    <h1 class="text-3xl mb-6">{{ list.name }}</h1>

    <input
      type="text"
      v-model="inputItem"
      @keyup.enter="addToList(inputItem)"
    />
    <ul>
      <li v-for="item in searchAutoComplete" :key="item">
        <span>{{ item }}</span>
        <button @click="addToList(item)">Add</button>
      </li>
    </ul>
    <button @click="addToList(inputItem)">Add</button>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Item </TableHead>
          <TableHead class="text-right"> Status </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in list.items" :key="item.id">
          <TableCell class="font-medium whitespace-nowrap">
            {{ `${item.amount} x ${item.name}` }}
          </TableCell>
          <TableCell class="text-right"> {{ item.checked }} </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "@/store/listStore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const route = useRoute();
const inputItem = ref<string>("");
const listStore = useListStore();
const list = useListStore().getList(route.params.id as any);

onMounted(() => {
  console.log("ShoppingList mounted");
  if (!list) {
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
  if (inputItem.value.length < 2) return [];
  return listStore.searchList
    .filter((item) =>
      item.toLowerCase().includes(inputItem.value.toLowerCase())
    )
    .slice(0, 10);
});
</script>

<style lang="scss" scoped></style>
