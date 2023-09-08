import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../Services/Images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Splash() {
    //function component
    
    const [token,setToken]=useState(null);
    const navigation=useNavigation();

    function testPromise(){
        
    }
  

    useEffect(()=>{
        const checkLogin= async ()=>{
            if(token){
                navigation.navigate("MainHome");
            }else{
                let r=await AsyncStorage.getItem('token').then((t)=>{
                    
                    if(t !== null){
                        navigation.navigate("MainHome");
                    }else{
                        navigation.navigate("Login");
                    }
                    
                });
            }
        }
        setTimeout(()=>{
            checkLogin();
        },2000);
    },[]);

    return (
        <SafeAreaView style={style.container}>
            <Image source={Images.logo} style={style.logo} resizeMode='contain' resizeMethod='resize' />
            <View style={{marginTop:20}}>
                <Text style={{fontSize:20,color:'#222',fontWeight:'bold'}}>AUG<Text style={{fontSize:20,color:'#D4360C',fontWeight:'bold'}}>MALL</Text></Text>
            </View>
            <View style={{marginTop:10}}>
                <Text style={{fontSize:14,color:'#222',fontWeight:'bold',fontStyle:'italic'}}>The AR Shopping Experiance</Text>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        width:'100%',
        height:200
    }
});