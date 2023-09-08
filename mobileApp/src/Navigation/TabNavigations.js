import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Home from '../Screens/Home';
import Orders from '../Screens/Orders';
import {BottomTabBar, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../Screens/Profile';
import NotificationScreen from '../Screens/NotificationsScreen';

const TabNavigators = () => {
    const Tab = createBottomTabNavigator();
    const [isDarkMode, setDarkMode] = useState(false);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#D4360C",
                    alignItems: 'center',
                    elevation: 0,
                    alignSelf: 'center',
                    width: '95%',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    position: 'absolute',
                    paddingVertical: 5,
                    marginTop: 5,
                    marginBottom: Platform.OS === 'ios' ? 20 : 10,
                    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
                    height: Platform.OS === 'ios' ? 60 : 55,
                    marginLeft: '3%',
                    borderTopColor: 'transparent'
                },
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: "#ff5",
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={({ route }) => ({
                    
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen
                name="Orders"
                component={Orders}
                options={{
                    headerShown:true,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-check" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={({ route, navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                    headerStyle: { backgroundColor: "#fff" },
                    headerTitle: (props) => <Text style={{ color: "#222", fontFamily: 'Roboto-Medium', fontSize: 18 }}>Profile</Text>,
                    headerShown: true,
                    headerRight: () => (
                        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => { navigation.navigate("EditProfile") }}>
                            <Ionicons name="pencil" color={"#222"} size={20} />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Tab.Navigator>
    )
}

export default TabNavigators;