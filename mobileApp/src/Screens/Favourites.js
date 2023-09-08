import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../Services/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Favourites() {
    const [favourites, setFavourites] = useState([]);

    const fetchFavories = async () => {
        let fv = require('../models/favourites.json');
        setFavourites(fv);
    }
    const removeFromFavorites = (id) => {
        // Logic to remove item from favorites
      };
    
    useEffect(() => {
        fetchFavories();
    }, [])
    const confirmRemove = (id) => {
        Alert.alert(
            'Remove from Favorites',
            'Are you sure you want to remove this item from your favorites?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => removeFromFavorites(id),
                },
            ],
            { cancelable: false },
        );
    };
    const RenderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ width: '69%', flexDirection: 'row' }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                    <View>
                        <Text style={styles.category}>{item.category}</Text>
                    </View>
                    <Text style={styles.date}>{item.addedDate}</Text>
                </View>
            </View>
            <View style={{ width: '30%' }}>
                <TouchableOpacity onPress={()=>{confirmRemove(item.id)}}>
                    <Text style={{ color: "#D4360C", textAlign: 'right' }}> <Ionicons name="trash" size={20} /> Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {!favourites.length &&
                <ImageBackground source={Images.ar_browsing} style={{ position: 'absolute', height: 120, width: '100%', bottom: 0, left: 0, opacity: 0.4 }} resizeMode='cover' />
            }
            {!favourites.length &&
                <View>
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 10, padding: 20 }}>
                        <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 3 }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={Images.wishlist} resizeMode='contain' style={{ width: '100%', height: 80 }} />
                                <Text style={{ fontSize: 30, color: "#000" }}>HMMM...</Text>
                            </View>
                            <View style={{ backgroundColor: "#D4360C", borderRadius: 10, padding: 20, marginTop: 10 }}><Text style={{ color: "#fff" }}>No Favourites Yet!</Text></View>
                        </View>
                    </View>
                </View>
            }
            {favourites.length > 0 &&
                <ScrollView>
                    <View style={{ marginTop: 20 }}>
                        <View>
                            {favourites.map(item => (
                                <RenderItem key={item.id} item={item} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        flex: 1,
    }, button: {
        backgroundColor: "#D4360C",
        borderRadius: 10,
        padding: 15,
        width: 200,
        color: "#fff"
    }, link: {
        color: "#2E86C1",
        fontSize: 14
    }, text: {
        color: "#222"
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 25,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#222"
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    category: {
        fontSize: 12,
        color: '#666',
    },
    date: {
        fontSize: 12,
        color: '#666',
    }
});