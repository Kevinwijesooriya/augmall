import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Images from '../Services/Images';
import { useNavigation } from '@react-navigation/native';

export default function Fortgot() {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={Images.logo} resizeMode='contain' style={{ width: '100%', height: 100 }} />
            <View style={{ marginTop: 10, padding: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 20,color:"#D4360C",marginBottom:10}}>Reset password</Text>
                <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <TextInput style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10 }} placeholder='Username' placeholderTextColor="#555" />
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Recover account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 1, backgroundColor: '#ddd', marginTop: 20 }}>

                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                        <Text style={{ color: "#D4360C", fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
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