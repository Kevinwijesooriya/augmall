import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import MainNavigations from './src/Navigation/MainNavigations';

function App(){
    return (
        <NavigationContainer>
           <MainNavigations />
        </NavigationContainer>
    );
}
export default App;
