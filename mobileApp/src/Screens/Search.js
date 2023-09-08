import { View, TextInput, FlatList, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';

import React, { useState } from 'react'
import Api from '../Services/Api';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={()=>{ nagivation.navigate("ArShop",{product:item}) }}>
                <Image source={item.image ? {uri:  item.image }: require('../Assets/Images/product.png') } style={styles.image} />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <View>
                        <Text style={styles.price}>{item.price} LKR</Text>
                    </View>
                    <View>
                        <Text style={styles.category}>{item.category}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    const fetchSearchResults = async (text) => {
        // if (!text || text.length < 3) {
        //     setResults([]);
        //     return;
        // }

        setLoading(true);
        setError(null);

        try {
            const response = await Api.get('products/search', {
                params: {
                    q: text,
                },
            });
            // console.log(response.data);
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch results.');
            console.log(err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={{ backgroundColor: "#ddd", borderColor: "#ddd", borderRadius: 20, padding: 10,color:"#000" }}
                onChangeText={(text) => {
                    setQuery(text);
                    fetchSearchResults(text);
                }}
                value={query}
                placeholder='Search products'  placeholderTextColor="#555" 
            />
            {loading && <View style={{margin:40,padding:40,justifyContent: 'center'}}><Text style={{textAlign:'center'}}>Loading...</Text></View>}
            {error && <View style={{margin:40,padding:40,justifyContent: 'center'}}><Text style={{color:"red",textAlign:'center'}}>{error}</Text></View>}
            <FlatList
                data={results}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(item) => item._id.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 8,
        marginBottom: 12,
        borderRadius: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
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
