import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react';
import {categoryData} from "../constants/index";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';


const Categories = ({categories, activeCategory, handleChangeCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        className="space-x-4"
      >

    {
        categories.map((cat, index) => {
            let isActive = cat.strCategory == activeCategory;
            let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";

            return (
                <TouchableOpacity
                    key={index}
                    onPress={()=> handleChangeCategory(cat.strCategory)}
                    className="flex items-center space-y-2"
                >
                    <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                        <Image className="rounded-full" source={{uri: cat.strCategoryThumb}} style={{width: hp(6), height: hp(6)}} />
                        {/* <CachedImage className="rounded-full" uri= {cat.strCategoryThumb} style={{width: hp(6), height: hp(6)}} /> */}
                    </View>
                    <Text className="text-neutral-600" style={{fontSize: hp(1.8)}}>{cat.strCategory}</Text>


                </TouchableOpacity>
            )
        })
    }


      </ScrollView>

    </Animated.View>
  )
}

export default Categories