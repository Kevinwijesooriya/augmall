import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Images from '../Services/Images';
import { useNavigation } from '@react-navigation/native';
import Api from '../Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({route}) {
    const success=route.params?.success;
    const [Error,setError]=useState(null);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();
    const setTokenByLogin = async (token)=>{
        await  AsyncStorage.setItem('token',token);
        navigation.navigate("MainHome");
    }
    const login = async ()=>{
        setError(null);
        setIsLoading(true);
        try {
            Api.post("users/login", {
                email: username,
                password: password
            })
            .then(response => {
                console.log(response.data);
                if(response.data.token) {
                    setTokenByLogin(response.data.token);
                } else {
                    setError('Invalid login details, please try again');
                }
            })
            .catch(error => {
                console.log(error);
                setError("There was an error during the login process");
            });
        } catch (error) {
            console.log(error);
            setError("There was an error during the login process");
        } finally{
            setIsLoading(false);
        }
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={Images.logo}  resizeMode='contain' style={{width:'100%',height:100}}/>
            <View style={{marginTop:10,padding:20}}>
                {success == 1 &&
                    <Text style={{color:"green",fontSize:16}}>You just registered on AugMall, Please login to continue</Text>
                }
                <View style={{display:'flex',justifyContent:'flex-start'}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setUsername} placeholder='Username' placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'flex-start',marginTop:10}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setPassword} placeholder='Password' secureTextEntry={true} placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'flex-end',marginTop:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Forgot')}}>
                        <Text style={styles.link}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                {Error &&
                    <Text style={{color:"red",fontSize:16}}>{Error}</Text>
                }
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={{textAlign:'center',fontSize:16,color:"#fff"}}>{isLoading == true ? (<Text>Wait...</Text>) : (<Text>Login</Text>) }</Text>
                    </TouchableOpacity>
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:1,backgroundColor:'#ddd',marginTop:20}}>
                    
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                        <Text style={{color:"#D4360C",fontSize:15,fontWeight:'bold',textAlign:'center'}}>New to here? Create account now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('MainHome')}}>
                        <Text style={{color:"#000",fontSize:15,fontWeight:'bold',textAlign:'center'}}>Bypass Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f8f8f8',
        flex:1,
        justifyContent: 'center'
    },button:{
        backgroundColor:"#D4360C",
        borderRadius:10,
        padding:15,
        width:200,
        color:"#fff"
    },link:{
        color:"#2E86C1",
        fontSize:14
    }
});