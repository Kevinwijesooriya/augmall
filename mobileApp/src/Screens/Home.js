import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../Services/Images';
const currentUser = require("../models/user.json");
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Api from '../Services/Api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigation=useNavigation();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          if (currentUser.products) {
            const response = await Api.get(
              `api/product/getRecommendedProducts/${currentUser.products.productIds}`
            );
            setProducts(response.data.data);
          } else {
            const response = await Api.get("products/top-products");
            setProducts(response.data);
          }
        } catch (err) {
          setError("Failed to fetch results.");
          console.log(err);
          setProducts([]);
        } finally {
          setLoading(false);
        }
    }
    
    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={()=>{ navigation.navigate("ArShop",{product:item}) }}>
                <Image source={ require('../Assets/Images/product.png') } style={styles.image} />
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
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={[styles.text, { fontSize: 20, marginLeft: 15 }]}>
            Welcome To{" "}
            <Text style={{ fontSize: 24, color: "#222", fontWeight: "bold" }}>
              AUG
              <Text
                style={{ fontSize: 24, color: "#D4360C", fontWeight: "bold" }}
              >
                MALL
              </Text>
            </Text>
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <ImageBackground
            source={Images.home_bg}
            resizeMode="contain"
            style={{ width: "100%", height: 200, borderRadius: 15 }}
          ></ImageBackground>
        </View>
        <View>
          <Text style={[styles.text, { fontSize: 20, marginLeft: 15 }]}>
            THE{" "}
            <Text style={{ fontSize: 24, color: "#222", fontWeight: "bold" }}>
              AR{" "}
              <Text
                style={{ fontSize: 24, color: "#D4360C", fontWeight: "bold" }}
              >
                SHOPPING
              </Text>
            </Text>{" "}
            EXPERIENCE
          </Text>
        </View>
        <View
          style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <LinearGradient
              colors={["#D4360C", "#D4360C", "#D4360C"]}
              style={styles.linearGradient}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
                {" "}
                Search Products
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.text, { fontSize: 20, marginLeft: 15 }]}>
              Products picked for you
            </Text>
            <View>
              {products.map((item) => (
                <RenderItem key={item._id} item={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center',
        padding: 10
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
export default Home;