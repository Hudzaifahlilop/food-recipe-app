import { View, Text, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const TestingAlquran = () => {
    const[dataAlquran, setDataAlquran] = useState([]);

    const getDataAlquran = async () => {
        try {
            const response = await axios.get(`https://equran.id/api/v2/surat`);
            const firstObject = response.data.data[55];
            console.log("API", firstObject);
            console.log(`Nama: ${firstObject.namaLatin}`);
            setDataAlquran(firstObject);
            
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(()=>{
        getDataAlquran();
    },[])



    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-14"
            >
                <Text >{dataAlquran.namaLatin}</Text>
                <Text >{dataAlquran.nama}</Text>
            </ScrollView>

        </View>

    )
}

export default TestingAlquran