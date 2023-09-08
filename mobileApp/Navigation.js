import { View, Text, SafeAreaView, Image,PanResponder,Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
const PIXELS_PER_METER = 10;
const STEPS_PER_METER=5;
export default function MapNavigation() {
    const [pan] = useState(new Animated.ValueXY());
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [distanceMoved, setDistanceMoved] = useState(0);
  
    useEffect(() => {
      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),
        onPanResponderGrant: (e, gestureState) => {
          setInitialPosition({ x: dotPosition.x, y: dotPosition.y });
        },
        onPanResponderRelease: (e, gestureState) => {
          const deltaX = gestureState.moveX - gestureState.x0;
          const deltaY = gestureState.moveY - gestureState.y0;
          const stepsMovedX = deltaX / STEPS_PER_METER;
          const stepsMovedY = deltaY / STEPS_PER_METER;
  
          const newX = dotPosition.x + stepsMovedX;
          const newY = dotPosition.y + stepsMovedY;
          setDotPosition({ x: newX, y: newY });
  
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          setDistanceMoved(distance);
          pan.setValue({ x: 0, y: 0 });
          setInitialPosition({ x: 0, y: 0 });
        },
      });
  
      return () => {
        panResponder.panHandlers = null;
      };
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Map Navigation</Text>
            </View>
            <View>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>X:{dotPosition.latitude * PIXELS_PER_METER} | Y: {dotPosition.longitude * PIXELS_PER_METER}</Text>
            </View>

            <Image source={require('./src/objects/nav_map.jpg')} style={{ width: '100%', height: '100%' }}  resizeMode='contain'/>
            <View
        style={{
          position: 'absolute',
          top: dotPosition.y * STEPS_PER_METER,
          left: dotPosition.x * STEPS_PER_METER,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'red',
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...pan.panHandlers}
      >
        {/* Your other components */}
      </Animated.View>
      <Text>Distance Moved: {distanceMoved.toFixed(2)} meters</Text>
        </SafeAreaView>
    )
}