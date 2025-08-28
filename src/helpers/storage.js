import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "FAVORITE_RECIPES";

export const saveRecipe = async (id) => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    let ids = stored ? JSON.parse(stored) : [];

    if (!ids.includes(id)) {
      ids.push(id);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    }
  } catch (e) {
    console.log("Error saving recipe:", e);
  }
};

export const removeRecipe = async (id) => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    let ids = stored ? JSON.parse(stored) : [];

    ids = ids.filter((mealId) => mealId !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.log("Error removing recipe:", e);
  }
};

export const getLikedIds = async () => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.log("Error fetching ids:", e);
    return [];
  }
};

export const isRecipeLiked = async (id) => {
  try {
    const ids = await getLikedIds();  
    return ids.includes(id);
  } catch (e) {
    return false;
  }
};
