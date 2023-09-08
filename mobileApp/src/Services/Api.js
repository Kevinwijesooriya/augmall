import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/**
 * React Native Axios API Helper
 */
var ApiURL = "http://192.168.164.239:3000/";
var headers= { 
        'Content-type': 'Application/json',
        Accept: 'Application/json',
    }

var Api = axios.create({
    baseURL: ApiURL,
    headers: headers,
    responseType: 'json',
    withCredentials: true,
    timeout: 10000,
});
Api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



export default Api;