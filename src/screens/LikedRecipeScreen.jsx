import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { CachedImage } from "../helpers/image";
import Loading from "../components/loading";
import { getLikedIds } from "../helpers/storage";
import { ArrowLeft } from "lucide-react-native";

export default function LikedRecipesScreen({ navigation }) {
	const [likedMeals, setLikedMeals] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchLikedMeals = async () => {
		setLoading(true);

		try {
			const ids = await getLikedIds();
			if (!Array.isArray(ids) || ids.length === 0) {
				setLikedMeals([]);
				setLoading(false);
				return;
			}

			const results = await Promise.all(
                ids.map(async (id) => {
                    try {
                    if (!id) return null;
                    const res = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await res.json();
                    return data?.meals?.[0] || null; 
                    } catch (err) {
                    console.error("Failed to fetch meal:", id, err);
                    return null;
                    }
                })
            );
            setLikedMeals(results.filter(Boolean));
		} catch (err) {
			console.error("Error fetching liked meals", err);
			setLikedMeals([]); // fallback
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", fetchLikedMeals);
		return () => unsubscribe();
	}, [navigation]);

	return (
		<SafeAreaView className="flex-1 bg-white px-4">
			<View className="flex-row items-center mt-3 mb-3">
				<Pressable onPress={() => navigation.goBack()}>
					<ArrowLeft size={hp(3.5)} strokeWidth={2.5} color="black" />
				</Pressable>
				<Text
					style={{ fontSize: hp(3) }}
					className="mx-4 my-3 font-semibold text-neutral-700"
				>
					Liked Recipes
				</Text>
			</View>

			{loading ? (
				<Loading size="large" className="mt-20" />
			) : likedMeals && likedMeals.length === 0 ? (
				<Text className="text-center text-gray-500 mt-10">
					No liked recipes yet
				</Text>
			) : (
				<MasonryList
					data={likedMeals || []} // ✅ fallback array
					keyExtractor={(item, index) =>
						item?.idMeal?.toString() || index.toString()
					}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, i }) =>
						item ? (
							<RecipeCard
								item={item}
								index={i}
								navigation={navigation}
							/>
						) : null
					}
				/>
			)}
		</SafeAreaView>
	);
}

const RecipeCard = ({ item, index, navigation }) => {
	let isEven = index % 2 === 0;
	return (
		<Animated.View
			entering={FadeInDown.delay(index * 100)
				.duration(600)
				.springify()
				.damping(12)}
		>
			<Pressable
				style={{
					width: "100%",
					paddingLeft: isEven ? 0 : 8,
					paddingRight: isEven ? 8 : 0,
				}}
				className="flex justify-center mb-4 space-y-1"
				onPress={() => navigation.navigate("RecipeDetail", { ...item })}
			>
				<CachedImage
					uri={item.strMealThumb}
					style={{
						width: "100%",
						height: index % 3 === 0 ? hp(25) : hp(35),
						borderRadius: 35,
					}}
					className="bg-black/5"
					sharedTransitionTag={`meal-${item.idMeal}`}
				/>
				<Text className="font-semibold ml-2 text-neutral-600">
                    {item?.strMeal
                        ? item.strMeal.length > 20
                        ? item.strMeal.slice(0, 20) + "..."
                        : item.strMeal
                        : "Unknown Recipe"}
                </Text>
			</Pressable>
		</Animated.View>
	);
};
