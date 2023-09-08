import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../Services/Images';

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        // let notificationData = require('../models/notifications.json');
        // setNotifications(notificationData);
    };
    const RenderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView>
            {/* {notifications.length > 0 && notifications.map((m)=>(
                <RenderItem item={m} />
            ))} */}
            {!notifications.length &&
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',padding:20,marginTop:20 }}>
                    <View style={{backgroundColor:"#fff",padding:20,borderRadius:10,shadowColor: '#171717',shadowOffset: {width: 0, height: 4},shadowOpacity: 0.2,shadowRadius: 3}}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:10 }}>
                            <Image source={Images.notification} resizeMode='contain' style={{ width: '100%', height: 80 }} />
                        </View>
                        <View style={{ backgroundColor: "#D4360C", borderRadius: 10, padding: 20 }}><Text style={{ color: "#fff" }}>No notifications!</Text></View>
                    </View>
                    {/* <ImageBackground source={Images.ar} resizeMode='contain' style={{width:'100%',height:100,opacity:0.2,borderRadius:50,marginTop:100}}>

                    </ImageBackground> */}

                </View>
            }
        </SafeAreaView>
    )
}