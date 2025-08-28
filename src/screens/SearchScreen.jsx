import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Search } from "lucide-react-native";
import Animated from "react-native-reanimated";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = async (searchText) => {
    if (!searchText) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
      const data = await res.json();
      setResults(data.meals || []);
    } catch (err) {
      console.error("Error fetching meals:", err);
    } finally {
      setLoading(false);
    }
  };

  // debounce input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetchMeals(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      {/* Search Bar */}
      <Animated.View
        sharedTransitionTag="searchBar"
        className="mt-12 mb-2 mx-2 flex-row items-center rounded-full bg-black/5 p-2"
      >
        <View className="flex-1 pl-3">
          <TextInput
            placeholder="Search Any recipe"
            placeholderTextColor="gray"
            style={{ fontSize: hp(1.7) }}
            value={query}
            onChangeText={setQuery}
            autoFocus={true} 
          />
        </View>
        <View className="bg-white rounded-full p-3">
          <Search size={hp(2.5)} strokeWidth={3} color="gray" />
        </View>
      </Animated.View>

      {/* Loading indicator */}
      {loading && <ActivityIndicator size="small" color="gray" style={{ marginVertical: 10 }} />}

      {/* Suggestions List */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}
            onPress={() => navigation.navigate("RecipeDetail", item)}
          >
            <Text style={{ fontSize: 16 }}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
