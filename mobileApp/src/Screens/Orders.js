import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../Services/Images';
import LinearGradient from 'react-native-linear-gradient';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        let orders = require('../models/orders.json');
        setOrders(orders);
    }
    const RenderItem = ({ item }) => (
      <View style={styles.item}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 90, height: 90, marginRight: 10 }}
          />
          <View>
            <Text style={styles.title}>
             {item.product.title}
            </Text>
            <Text style={styles.title}>Order ID : #{item.orderId}</Text>
            <View>
              <Text style={styles.price}>{item.total}</Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={[styles.date]}>{item.date}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity>
                <Text style={[{ color: "#2a2a2a" }, styles.link]}>
                  View order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {orders.length > 0 && orders.map((m => (
                <View>
                    <ScrollView>
                        <RenderItem item={m} />
                    </ScrollView>
                </View>
            )))}
            {!orders.length &&
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={Images.no_orders} resizeMode='contain' style={{ width: '100%', height: 80 }} />
                    </View>
                    <View style={{ backgroundColor: "#D4360C", borderRadius: 10, padding: 20 }}><Text style={{ color: "#fff" }}>No Any orders!</Text></View>
                    {/* <TouchableOpacity style={{marginTop:20,borderTopColor:"#ddd",borderTopWidth:1,paddingTop:20}}>
                    <LinearGradient
                        colors={['#D4360C', '#6C3483', '#1C2833']}
                        style={styles.linearGradient}
                    >
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>SHOP NOW</Text>
                    </LinearGradient>
                </TouchableOpacity> */}
                </View>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start'
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
        flexDirection: 'column',
        padding: 10,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#eee",
        width: '98%',
        justifyContent: 'center',
        alignSelf: 'center'
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
        fontSize: 16,
        color: '#D4360C',
        fontWeight: 'bold'
    },
    category: {
        fontSize: 12,
        color: '#666',
    },
    date: {
        fontSize: 14,
        color: '#666',
    }
});