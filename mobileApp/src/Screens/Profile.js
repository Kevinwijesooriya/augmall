import { View, Text, SafeAreaView, ActivityIndicator, Image, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
export default function Profile() {
    const [isLoading, setisLoading] = useState(false);
    const [user,setUser]=useState([]);
    const navigator=useNavigation();

    const logout = async () => {
        await AsyncStorage.clear().then(function () {
            navigator.reset({
                index: 0,
                routes: [{ name: 'SlashScreen' }]
            })
        });
    }
    const getUser = async () => {
        let u=require('../models/user.json');
        setUser(u);
        return;
        setisLoading(true);
        return [];
    }

    useEffect(()=>{
        getUser();
    },[]);

    const handleShare = () => {
        Share.share({
            title: 'Share with friend',
            message: 'Share Augmall!',
            url: 'https://play.google.com/',
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <SafeAreaView>
            {isLoading == true &&
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={26} color={"#222"} />
                </View>
            }
            <ScrollView style={{ marginBottom: 100 }}>
                    <View style={{ margin: 10 }}>
                        <View style={{ flexDirection: 'row', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, padding: 30, marginBottom: 5, marginTop: 10, backgroundColor: "#fff" }}>
                            <Image
                                source={{ uri: user?.avatar }}
                                style={{width:80,height:80,borderRadius:1000}}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{
                                    marginTop: 15,
                                    marginBottom: 5,
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: "#222"
                                }}>{user?.name}</Text>
                                <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '500', color: "#222" }}>{user?.username ? '@' + user?.username : user?.email}</Text>
                                <Text style={{ fontSize: 12, lineHeight: 14, fontWeight: '400', marginTop: 5, color: "#222" }}>Joined : {user?.joined ? '' + user?.joined : 'a long time ago'}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View>
                        <View style={styles.menuWrapper}>
                            

                            <TouchableOpacity onPress={() => { navigator.navigate("Favourites", { back_button: true, backScreen: "ProfileScreen" }) }}>
                                <View style={styles.menuItem}>
                                    <FontAwesome5Icon name="heart" color="#D4360C" size={25} />
                                    <Text style={styles.menuItemText}>Your Favorites</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { handleShare() }}>
                                <View style={styles.menuItem}>
                                    <Ionicons name="share-social-outline" color="#D4360C" size={25} />
                                    <Text style={styles.menuItemText}>Tell Your Friends</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => { logout() }}>
                                <View style={styles.menuItem}>
                                    <Ionicons name="log-out-outline" color="#D4360C" size={25} />
                                    <Text style={styles.menuItemText}>Logout</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    }
})