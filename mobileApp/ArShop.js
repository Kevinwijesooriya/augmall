import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroARSceneNavigator,
    ViroTrackingStateConstants,
    ViroARTrackingReasonConstants,
    ViroAmbientLight,
    Viro3DObject,
    ViroMaterials,
} from '@viro-community/react-viro';
import Api from './src/Services/Api';

const ViewAr = ({ route }) => {
    function ARPathScene(paths) {
        if(!path) return (<></>);
        return (
            <ViroARScene>
                {paths.map((path, index) => (
                    <ViroPolyline
                        key={index}
                        position={[0, 0, 0]} // base position
                        points={[[path.sx, 0, path.sy], [path.ex, 0, path.ey]]}
                        thickness={0.1}
                        materials={['pathMaterial']}
                    />
                ))}
            </ViroARScene>
        );
    }
    
    ViroMaterials.createMaterials({
        pathMaterial: {
            diffuseColor: 'blue',
        },
    });

    
    const product = route?.params.product;
    const [text, setText] = useState('Initializing AR...');
    const [path, setPath] = useState(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await Api.get('products/top-products');
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch results.');
            console.log(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchClosestPath = async () => {
            try {
                const response = await Api.get(`products/getClosestPath?x=${startX}&y=${startY}&productX=${product.x}&productY=${product.y}`);
                setPath(response.data);
            } catch (error) {
                console.error("Error fetching closest path:", error);
            }
        };

        fetchClosestPath();
    }, []);

    function onInitialized(state, reason) {
        console.log('guncelleme', state, reason);
        if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
            setText('Hello World!');
        } else if (state === ViroARTrackingReasonConstants.TRACKING_REASON_NONE) {
            // Handle loss of tracking
        }
    }


    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <ViroAmbientLight
                color="#ffffff"
            />
            {products.map(product => (
                <ViroText
                    key={product.name}
                    position={[product.x, 0, product.y]}
                    text={product.name}
                    scale={[0.5, 0.5, 0.5]}
                    style={{ fontFamily: 'Arial', fontSize: 20, color: 'white' }}
                />
            ))}
            <ARPathScene paths={path} />
        </ViroARScene>
    );
}

export default function ArShop({route}) {
    return (
        <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
                scene: ViewAr,
            }}
            style={styles.f1}
        />
    )
}

var styles = StyleSheet.create({
    f1: { flex: 1 },
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});