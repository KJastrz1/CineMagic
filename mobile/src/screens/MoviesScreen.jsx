import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useFetch from '../Hooks/useFetch';
import MovieCard from '../components/Movies/MovieCard';
import MySpinner from 'components/UI/MySpinner';
import ErrorScreen from 'components/UI/ErrorScreen';


const MoviesScreen = () => {

    const { data, error, isLoading } = useFetch('/Movie');

    if (isLoading) return <MySpinner />;

    if (error) return <ErrorScreen error={error} />;

    if (data.length === 0) {
        return <ErrorScreen error={'No movies found, use admin account to add some'} />;
    }
    return (
        <ScrollView style={styles.view} >
            <View style={styles.container}>
                {data && data.map((movie) => (
                    <View key={movie.id}>
                        <MovieCard movie={movie} />
                    </View>
                ))}
            </View >
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#212529',

    },
    container: {
        marginTop: 30,
        marginBottom: 20,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,

    },


});
export default MoviesScreen;
