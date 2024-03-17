import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/Recipes';


const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);


  const getCategoryData = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log("ini data api", response.data);
      if (response && response.data.categories) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log("ini data api category", response.data);
      if (response && response.data.meals) {
        setMeals(response.data.meals)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategoryData();
    getRecipes();
  }, []);

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2 ">
          <Image className='rounded-full' source={require('../asset/avatar.png')} style={{ width: hp(5), height: hp(5.5) }} />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* konten greetings */}
        <View className="space-y-2 mx-4 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600 ">hi, Lilo pambudi</Text>
          <View>
            <Text style={{ fontSize: hp(3.5) }} className="font-semibold text-neutral-600">Make Your Own Food,</Text>
          </View>
          <Text style={{ fontSize: hp(3.5) }} className="font-semibold text-neutral-600">Stay At
            <Text className="text-amber-600"> Home</Text>

          </Text>
        </View>

        {/* searchbar */}
        <View className="flex-row mx-4 items-center justify-between rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='search any receipe'
            placeholderTextColor='grey'
            style={{ fontSize: hp(2) }}
            className="mx-4 tracing-wider"
          />
          <View className="bg-white rounded-full p-3" >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* resep */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen