import React from 'react';
import {  Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const { width: windowWidth } = Dimensions.get('window');

function HomeScreen({ navigation }) {
    const imageArray = [
        require('assets/home/1-movies-in-park-1024x683.webp'),
        require('assets/home/movie-on-roof-cups.png'),
        require('assets/home/cinema-audience.jpg'),
    ];

    const headerArray = ['Welcome to CineMagic!', 'Looking for movie?', 'Rate movies and share your experience'];
    const textArray = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit...', 'Etiam porta sem malesuada magna mollis euismod...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'];

   
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Image source={item} style={styles.image} />
                <Text style={styles.header}>{headerArray[index]}</Text>
                <Text style={styles.text}>{textArray[index]}</Text>
            </View>
        );
    };

    return (

        <View style={styles.view}>
            <Carousel
                loop
                data={imageArray}
                renderItem={renderItem}
                width={windowWidth}
                height={300}
                scrollAnimationDuration={1000}
                autoPlay
                autoPlayInterval={3000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#212529',        
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        backgroundColor: '#cec5c5', 
    },
    image: {
        width: '100%',
        height: 200,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
   
});

export default HomeScreen;
