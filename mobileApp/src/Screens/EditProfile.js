import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function EditProfile() {
    return (
        <SafeAreaView style={{ padding: 10, flex: 1 }}>
            <View style={{backgroundColor:"#fff",borderRadius:10,padding:20, shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3}}>
                <View style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                    <TextInput style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10 }} placeholder='Your full name' placeholderTextColor="#555" />
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <TextInput style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10 }} placeholder='Mobile' placeholderTextColor="#555" />
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10,borderTopWidth:1,borderTopColor:"#ddd",paddingTop:20 }}>
                    <Text style={{color:"#555",marginBottom:10}}>Keep empty to unchange password</Text>
                    <TextInput style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10 }} placeholder='New Password' secureTextEntry={true} placeholderTextColor="#555" />
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10 }}>
                    <TextInput style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10 }} placeholder='Confirm New Password' secureTextEntry={true} placeholderTextColor="#555" />
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10,borderTopWidth:1,borderTopColor:"#ddd",paddingTop:20 }}>
                    <TextInput style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10 }} placeholder='Current Password' secureTextEntry={true} placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{textAlign:'center',fontSize:16}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   button:{
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