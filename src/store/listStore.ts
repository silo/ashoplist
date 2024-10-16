import { useUUID } from "@/utils/uuid";
import { defineStore } from "pinia";
import { ref } from "vue";
export type ShoppingList = {
  id: string;
  name: string;
  items: ListItems[];
  printed: boolean;
};

export type ListItems = {
  id: string;
  name: string;
  checked: boolean;
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

  const addToList = (listId: string, itemValue: string) => {
    const list = shoppingList.value.find((list) => list.id === listId);
    list?.items.push({
      id: useUUID("listItem-xxxxxx"),
      name: itemValue,
      checked: false,
    });
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
    addToSearchList
  };
},
{
  persist: {
    storage: localStorage
  }
});
