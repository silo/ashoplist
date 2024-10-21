<template>
  <div class="flex min-h-screen w-full flex-col">
    <h1 class="text-3xl mb-6">Shopping list</h1>
    <Input type="text" v-model="newItem" @keyup.enter="createNewShoppingList" />
    <Button @click="createNewShoppingList">Create new shopping list</Button>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>List name</TableHead>
          <TableHead>Items</TableHead>
          <TableHead class="text-right"> Action </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in listStore.shoppingList" :key="item.id">
          <TableCell class="font-medium">{{ item.name }}</TableCell>
          <TableCell>{{ itemsAmountInShoppingList(item.id) }}</TableCell>
          <TableCell class="text-right">
            <Button
              variant="outline"
              size="icon"
              @click="listStore.removeShoppingList(item.id)"
            >
              <Trash class="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              @click="goToShoppingList(item.id)"
            >
              <ChevronRight class="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useListStore } from "@/store/listStore";
// import { useUUID } from "@/utils/uuid";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Trash } from "lucide-vue-next";

const listStore = useListStore();
const newItem = ref("");
const router = useRouter();
const createNewShoppingList = () => {
  console.log("Creating new shopping list");
  if (!newItem.value) return;
  listStore.addToShoppingList(newItem.value);
  newItem.value = "";
};

const goToShoppingList = (id: string) => {
  router.push({ name: "shoppingList", params: { id: id } });
};

const itemsAmountInShoppingList = (id: string) => {
  return listStore.shoppingList.find((list) => list.id === id)?.items.length;
  

};
</script>

<style lang="scss" scoped></style>
