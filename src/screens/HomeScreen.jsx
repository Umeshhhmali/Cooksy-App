import { View, Text, Image, ScrollView, TextInput, TouchableOpacity,Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Heart, Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from 'react-native-reanimated';

import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Recipes from '../components/Recipes';
import axios from 'axios'

const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Vegetarian');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        const sortedCategories = response.data.categories.sort((a, b) =>
          b.strCategory.localeCompare(a.strCategory) // 👈 flipped order
        );
        setCategories(sortedCategories);
      }
    } catch (error) {
      console.log('error: ' + error.message);
    }
  };
  
  const getRecipes = async (category = 'Dessert') =>{
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}
`);
      if ( response && response.data){
        setMeals(response.data.meals);
      }
      
    } catch (error) {
      console.log('error: '+error.message)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark'/>
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}
          className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between">
          <Image source={require('../../assets/image/avatar.png')} style={{height: hp(5.5), width: hp(5.5)}}/>
          <Pressable onPress={() => navigation.navigate("LikedRecipe")}>
            <Heart size={hp(4)} color="gray"/>
          </Pressable>
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize:hp(1.7)}} className="mt-3 text-neutral-600">Hello, Omi!</Text>
           <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">
              Cook your own food,
            </Text>

            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">
              Stay at <Text className="text-amber-500">Home</Text>
            </Text>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate("Search")} 
          activeOpacity={0.7}
        >
          <Animated.View
            sharedTransitionTag="searchBar"
            className="mx-4 my-6 flex-row items-center rounded-full bg-black/5 p-2"
          >
            <View className="flex-1 ml-4">
              <Text className="text-gray-400">Search Any recipe</Text>
            </View>
            <View className="bg-white rounded-full p-3">
              <Search size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </Animated.View>
        </TouchableOpacity>
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
        </View>

        <View>
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen