import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';
import { ChevronLeft, Clock, Flame, Heart, Layers, Users } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubePlayer from "react-native-youtube-iframe";
import Animated, { FadeInDown,FadeIn } from 'react-native-reanimated';
import { saveRecipe, removeRecipe, isRecipeLiked, getLikedIds } from "../helpers/storage";


export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavorite, setIsFavorite] = useState(null);
    const navigation = useNavigation();
    const [meal,setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const liked = await isRecipeLiked(item.idMeal); 
            setIsFavorite(liked);
            await getMealData(item.idMeal); 
        };
        init();
    }, [item.idMeal]);



    const toggleFavorite = async () => {
        if (isFavorite) {
            await removeRecipe(item.idMeal);
        } else {
            await saveRecipe(item.idMeal);
        }
        setIsFavorite((prev) => !prev); 
    };

    const getMealData = async (id) =>{
        try {
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if ( response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
        }
        } catch (error) {
        console.log('error: '+error.message)
        }
    }

  const ingredientsIndexes = (meal) => {
    if(!meal) return [];
    let indexes = [];
    for(let i=1; i<=20; i++){
        if(meal['strIngredient'+i]){
            indexes.push(i);
        }
    }
    return indexes;
  }

  const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if(match && match[1]){
            return match[1];
        }
        return null;
    };

  return (
    <ScrollView
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
    >
        <StatusBar style={"light"}/>

        <View className="flex-row justify-center">
            <CachedImage
                uri={item.strMealThumb}
                sharedTransitionTag={item.strMeal}
                style={{width: wp(98), height: hp(50), borderRadius: 33, borderBottomLeftRadius: 60,borderBottomRightRadius: 60, marginTop: 3}}
            />
        </View>

        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
            <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                <ChevronLeft size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite} className="p-2 rounded-full mr-5 bg-white">
                 {isFavorite === null ? null : (
                    <Heart
                        size={hp(3.5)}
                        fill={isFavorite ? "red" : "gray"}
                        stroke="none"
                    />
                )}
            </TouchableOpacity>
        </Animated.View>

        {
            loading? (
                <Loading size="large" className="mt-16"/>
            ):(
                <View className="px-4 flex justify-between space-y-4 pt-8">
                    <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="pb-4 space-y-4">
                        <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-neutral-700">
                            {meal?.strMeal}
                        </Text>
                        <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500">
                            {meal?.strArea}
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around pb-5">
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <Clock size={hp(4)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    35
                                </Text>
                                <Text style={{fontSize:hp(1.5)}} className="font-bold text-neutral-700">
                                    Mins
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <Users size={hp(4)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    03
                                </Text>
                                <Text style={{fontSize:hp(1.5)}} className="font-bold text-neutral-700">
                                    Servings
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <Flame size={hp(4)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    105
                                </Text>
                                <Text style={{fontSize:hp(1.5)}} className="font-bold text-neutral-700">
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View className="flex rounded-full bg-amber-300 p-2">
                            <View
                                style={{height: hp(6.5), width: hp(6.5)}}
                                className="bg-white rounded-full flex items-center justify-center"
                            >
                                <Layers size={hp(4)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    
                                </Text>
                                <Text style={{fontSize:hp(1.5)}} className="font-bold text-neutral-700">
                                    Easy
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Ingredients */}
                    <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                        <View className="space-y-2 pb-3">
                            <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                Ingredients
                            </Text>
                        </View>
                        <View className="gap-2 ml-3">
                            {
                                ingredientsIndexes(meal).map(i=>{
                                    return(
                                        <View key={i} className="flex-row gap-4">
                                            <View style={{height:hp(1.5), width: hp(1.5)}}
                                                className="bg-amber-300 rounded-full"/>
                                            <View className="flex-row gap-2">
                                                <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-600">{meal['strMeasure'+i]}</Text>
                                                <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </Animated.View>

                    {/* Instruction */}
                    <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="gap-4">
                        <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                            Instructions
                        </Text>
                        <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
                            {
                                meal?.strInstructions
                            }
                        </Text>
                    </Animated.View>

                    {/*Recipe video*/}
                    {
                        meal.strYoutube && (
                            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="gap-4">
                                <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                    Recipe Video
                                </Text>
                                <View>
                                    <YoutubePlayer
                                        videoId={getYoutubeVideoId(meal.strYoutube)}
                                        height={hp(30)}
                                        width={wp(95)}
                                        play={false}
                                    />
                                </View> 
                            </Animated.View>
                        )
                    }
                </View>
            )
        }
    </ScrollView>
  )
}