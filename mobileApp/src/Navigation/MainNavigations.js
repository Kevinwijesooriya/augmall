import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Fortgot from '../Screens/Fortgot';
import Register from '../Screens/Register';
import TabNavigators from './TabNavigations';
import Favourites from '../Screens/Favourites';
import EditProfile from '../Screens/EditProfile';
import ArShop from '../../ArShop';
import MapNavigation from '../../Navigation';
import Search from '../Screens/Search';
const Stack = createNativeStackNavigator();
export default function MainNavigations() {
    return (
        <Stack.Navigator initialRouteName={"SlashScreen"}>
            <Stack.Screen
                name={"SlashScreen"}
                component={Splash}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Forgot"}
                component={Fortgot}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Register"}
                component={Register}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"MainHome"}
                component={TabNavigators}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Favourites"}
                component={Favourites}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name={"EditProfile"}
                component={EditProfile}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name={"ArShop"}
                component={ArShop}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name={"MapNavigation"}
                component={MapNavigation}
                options={{headerShown: true}}
            />
             <Stack.Screen
                name={"Search"}
                component={Search}
                options={{headerShown: true}}
            />
        </Stack.Navigator>
    )
}