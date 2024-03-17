import { Image, Pressable, Text, View } from 'react-native'
import React, { Component } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from "../constants/index";
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';


function Recipes({ meals, categories }) {
    const navigation = useNavigation();
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">Recipes</Text>
            <View>
                {
                    categories.length==0 || meals.length==0? (
                        <Loading size="large" className="mt-20" color="#D97706FF"/>
                    ) :
                        (<MasonryList
                            data={meals} // Perlu didefinisikan atau diimpor dari mana data mealData berasal
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />)
                }
            </View>
        </View>
    );
}

export default Recipes

const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable style={{ paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }} className="w-full flex justify-center mb-4 space-y-1" onPress={()=> navigation.navigate("Detail", {...item})}>
                <Animated.Image source={{ uri: item.strMealThumb }} className="bg-black/5 w-full rounded-xl" style={{ height: index % 3 == 0 ? hp(25) : hp(35) }} sharedTransitionTag={item.strMeal} />
                {/* <CachedImage uri= {item.strMealThumb} className="bg-black/5 w-full rounded-xl" style={{ height: index % 3 == 0 ? hp(25) : hp(35) }} /> */}
                <Text style={{ fontSize: hp(2) }} className="font-semibold text-neutral-600 ml-2">
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}