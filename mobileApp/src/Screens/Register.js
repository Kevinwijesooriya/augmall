import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Images from '../Services/Images';
import { useNavigation } from '@react-navigation/native';
import Api from '../Services/Api';
const  Register=()=> {
    const [Username,setUsername]=useState('');
    const [Email,setEmail]=useState('');
    const [Mobile,setMobile]=useState('');
    const [Password,setPassword]=useState('');
    const [ConfirmPassword,setConfirmPassword]=useState('');
    const navigation=useNavigation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Register = async ()=>{
        setLoading(true);
        setError(null);
        if(Password != ConfirmPassword){
            setError("Password mot matched!");
            return;
        }
        try {
            Api.post("users/register", {
                email: Email,
                password:Password,
                username:Username,
                mobile:Mobile,
                country:'lk',
                role:'user',
            })
            .then(response => {
                navigation.navigate("Login",{success:1});
            })
            .catch(error => {
                console.log(error);
                setError("There was an error during the register process");
            });
        } catch (err) {
            setError('Failed to register, please try again later.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={Images.logo}  resizeMode='contain' style={{width:'100%',height:100}}/>
            <View style={{marginTop:10,padding:20}}>
                <Text style={{ textAlign: 'center', fontSize: 20,color:"#D4360C",marginBottom:10}}>Register on <Text style={{fontSize:20,color:'#222',fontWeight:'bold'}}>AUG<Text style={{fontSize:20,color:'#D4360C',fontWeight:'bold'}}>MALL</Text></Text></Text>
                <View style={{display:'flex',justifyContent:'flex-start',marginBottom:10}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setUsername} placeholder='Your full name' placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'flex-start',marginBottom:10}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setEmail} placeholder='Email address' placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'flex-start'}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setMobile} placeholder='Mobile' placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'flex-start',marginTop:10}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setPassword} placeholder='Password' secureTextEntry={true} placeholderTextColor="#555" />
                </View>
                <View style={{display:'flex',justifyContent:'flex-start',marginTop:10}}>
                    <TextInput style={{backgroundColor:"#ddd",borderColor:"#ddd",borderRadius:20,padding:10,color:"#000"}} onChangeText={setConfirmPassword} placeholder='Confirm Password' secureTextEntry={true} placeholderTextColor="#555" />
                </View>
                {error &&
                    <Text style={{color:"red",fontSize:16}}>{error}</Text>
                }
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <TouchableOpacity style={styles.button} onPress={Register}>
                        <Text style={{textAlign:'center',fontSize:16,color:"#fff"}}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:1,backgroundColor:'#ddd',marginTop:20}}>

                </View>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                        <Text style={{color:"#D4360C",fontSize:15,fontWeight:'bold',textAlign:'center'}}>Already have a account ?</Text>
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

export default Register;