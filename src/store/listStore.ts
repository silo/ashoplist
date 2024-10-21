import { useUUID } from "@/utils/uuid";
import { defineStore } from "pinia";
import { ref } from "vue";
export type ShoppingList = {
  id: string;
  name: string;
  items: ListItem[];
  printed: boolean;
};

export type ListItem = {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
};

export const useListStore = defineStore("shoppingList", () => {
  const shoppingList = ref<ShoppingList[]>([]);
  const searchList = ref<string[]>([]);

  const addToShoppingList = (listValue: string) => {
    shoppingList.value.push({
      name: listValue,
      printed: false,
      id: useUUID("list-xxxxxx"),
      items: [],
    });
  };

  const removeShoppingList = (listId: string) => {
    // remove specific list from the list with ids
    const index = shoppingList.value.findIndex((list) => list.id === listId);
    if (index !== undefined && index !== -1) {
      shoppingList.value.splice(index, 1);
    }
  }

  const addToList = (listId: string, itemValue: string) => {
    const list = shoppingList.value.find((list) => list.id === listId);
    // if it exists in the list, plus the amount
    const item = list?.items.find((item) => item.name === itemValue);
    if (item) {
      item.amount++;
    } else {
      list?.items.push({
        name: itemValue,
        checked: false,
        amount: 1,
        id: useUUID("item-xxxxxx"),
      });
    }
  };

  const removeFromList = (listId: string, itemId: string) => {
    // remove specific list item from the list with ids
    const list = shoppingList.value.find((list) => list.id === listId);
    const index = list?.items.findIndex((item) => item.id === itemId);
    if (index !== undefined && index !== -1) {
      list?.items.splice(index, 1);
    }
  };

  const getList = (listId: string) => {
    return shoppingList.value.find((list) => list.id === listId);
  };

  const addToSearchList = (listValue: string) => {
    // add if not already in the list
    if (!searchList.value.includes(listValue)) {
      searchList.value.push(listValue);
    }
  }

  return {
    shoppingList,
    addToShoppingList,
    addToList,
    removeFromList,
    getList,
    searchList,
    addToSearchList,
    removeShoppingList
  };
},
{
  persist: {
    storage: localStorage
  }
});
