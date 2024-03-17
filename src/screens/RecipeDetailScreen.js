import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';





const RecipeDetailScreen = (props) => {
    let item = props.route.params
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDetailRecipes(item.idMeal);
    }, []);


    const getDetailRecipes = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            // console.log("ini data api detil category", response.data.meals[0]);
            if (response && response.data.meals) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }} className="flex-1 bg-white">
            <StatusBar style='light' />
            {/* image recipe */}
            <View className="flex-row justify-center ">
                <Animated.Image source={{ uri: item.strMealThumb }} style={{ width: wp(98), height: hp(50) }} className="rounded-xl" sharedTransitionTag={item.strMeal} />
            </View>
            {/* back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity className="bg-white rounded-full ml-5 p-2">
                    <ChevronLeftIcon onPress={() => navigation.goBack()} size={hp(3.5)} strokeWidth={4.5} color="#D97706FF" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-full mr-5 p-2">
                    <HeartIcon onPress={() => setIsFavorite(!isFavorite)} size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>
            {/* detail description */}
            {
                loading ?

                    (<Loading size="large" className="mt-16" color="#D97706FF" />) :
                    (
                        <View className="flex justify-between px-4 pt-8 space-y-4">
                            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                                <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-700 flex-1">{meal?.strMeal}</Text>
                                <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-500 flex-1">{meal?.strArea}</Text>

                            </Animated.View>

                            {/* detail */}
                            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around" >
                                <View className="rounded-full bg-amber-300 p-2" >
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex items-center justify-center bg-white rounded-full">
                                        <ClockIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-700">35</Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-semibold text-neutral-700">mins</Text>
                                    </View>
                                </View>
                                <View className="rounded-full bg-amber-300 p-2" >
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex items-center justify-center bg-white rounded-full">
                                        <UserIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-700">02</Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-semibold text-neutral-700">serving</Text>
                                    </View>
                                </View>
                                <View className="rounded-full bg-amber-300 p-2" >
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex items-center justify-center bg-white rounded-full">
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-700">102</Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-semibold text-neutral-700">Cal</Text>
                                    </View>
                                </View>
                                <View className="rounded-full bg-amber-300 p-2" >
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex items-center justify-center bg-white rounded-full">
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-700"></Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-semibold text-neutral-700">Easy</Text>
                                    </View>
                                </View>
                            </Animated.View>
                            {/* ingredients */}
                            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4" >
                                <Text className="font-bold text-neutral-700" style={{ fontSize: hp(3) }} >Ingredients:</Text>
                                <View className="space-y-2 ml-3" >
                                    {
                                        ingredientsIndexes(meal).map(i => {
                                            return (
                                                <View key={i} className="flex-row space-x-2 items-center" >
                                                    <View className="bg-amber-300 rounded-full " style={{ height: hp(1.5), width: hp(1.5) }} />
                                                    <View className="flex-row space-x-2">
                                                        <Text style={{ fontSize: hp(2.2) }} className="font-extrabold text-neutral-600">{meal['strMeasure' + i]}</Text>
                                                        <Text style={{ fontSize: hp(2.2) }} className="font-medium text-neutral-500">{meal['strIngredient' + i]}</Text>
                                                    </View>

                                                </View>

                                            )
                                        })
                                    }
                                </View>
                            </Animated.View>
                            {/* instruction */}
                            <View className="space-y-4" >
                                <Text className="font-bold text-neutral-700" style={{ fontSize: hp(3) }} >Instructions:</Text>
                                <Text className="text-neutral-700" style={{ fontSize: hp(1.7) }}>
                                    {
                                        meal?.strInstructions
                                    }
                                </Text>
                            </View>
                            {/* youtubevideo */}
                            {
                                meal.strYoutube && (
                                    <View className="space-y-4">
                                        <Text className="font-bold text-neutral-700" style={{ fontSize: hp(3) }} >Youtube Video:</Text>
                                        <View>
                                            <YoutubeIframe
                                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                                // videoId='nMyBC9staMU'
                                                height={hp(30)}
                                            />
                                        </View>

                                    </View>
                                )
                            }


                        </View>




                    )
            }
        </ScrollView>
    )
}

export default RecipeDetailScreen