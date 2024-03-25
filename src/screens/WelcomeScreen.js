import { View, Text, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(()=>{
    ring1padding.value= 0;
    ring2padding.value= 0;

    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)),100);
    setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)),300);

    setTimeout(()=> navigation.navigate("Home"), 3000);
  })

  return (
    <View className='bg-amber-600 flex-1 justify-center items-center space-y-10'>
      <ExpoStatusBar style='dark' />
      {/* image */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ring1padding}}>
          <Image className="rounded-full" source={require('../asset/openingpict.png')} style={{width: hp(20), height: hp(20)}}/>
        </Animated.View>
      </Animated.View>
      {/* Tittle */}
      <View className="flex items-center space-y-2">
          <Text className="font-bold tracking-widest text-white" style={{fontSize: hp(7)}}>
            FOODY !
          </Text>       
          <Text className="font-medium text-white tracking-widest" style={{fontSize: hp(2.5)}}>
            Food is Always Right.
          </Text>       
      </View>
      {/* <Loading /> */}
    </View>
  )
}

export default WelcomeScreen