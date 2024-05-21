import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import useFetch from '../Hooks/useFetch';
import MySpinner from 'components/UI/MySpinner';
import ErrorScreen from 'components/UI/ErrorScreen';
import Comments from 'components/Comments/Comments';
import AddComment from 'components/Comments/AddComment';
import { CLOUDINARY_CLOUD_NAME } from '@env';
import PageButtons from 'components/UI/PageButtons';

const MovieDetailsScreen = () => {
    const route = useRoute();
    const { movieId } = route.params;
    const { data: movie, isLoading: isLoadingMovie, error: errorMovie } = useFetch(`/Movie/${movieId}`);


    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [url, setUrl] = useState(`/Comment/${movieId}/search/${page}/${pageSize}`);

    const { data: comments, isLoading: isLoadingComments, error: errorComments, totalPages, totalItems, refetch: refetechComments } = useFetch(url);


    const handlePageChange = (newPage) => {
        setPage(newPage);
        setUrl(`/Comment/${movieId}/search/${newPage}/${pageSize}`);
    };

    const cld = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });

    let publicId;

    if (movie && movie.imageUrl) {
        const parts = movie.imageUrl.split('/');
        publicId = parts.slice(7).join('/');
    } else {
        publicId = 'placeholder';
    }
    let myImage = cld.image(publicId);
    myImage.resize(fill().aspectRatio('9:12').height(400));
    myImage.format('auto');


    if (isLoadingMovie && isLoadingComments) return <MySpinner />;

    if (errorMovie || errorComments) {
        let error = errorMovie || errorComments;
        return <ErrorScreen error={error} />;
    }
    return (
        <View style={styles.container}>
            {movie && (
                <ScrollView style={styles.view}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.subtitle}>dir. {movie.director}</Text>
                    </View>
                    <AdvancedImage cldImg={myImage} style={styles.movieImage} />
                    <View style={styles.ratingContainer}>
                        <FontAwesomeIcon icon={faStar} size={15} color="#f2d307" />
                        <Text style={styles.ratingText}>{movie.rating} ({movie.numberOfRatings})</Text>
                    </View>
                    <Text style={styles.description}>{movie.description}</Text>
                   
                    <AddComment movieId={movieId} refetch={refetechComments}/>

                    <Comments comments={comments} totalItems={totalItems} />    
                    <View style={styles.pagination}>
                        <PageButtons totalPages={totalPages} onPageChange={handlePageChange} currentPage={page} />
                    </View>            

                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212529',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    view: {
        flex: 1,
    },
    movieImage: {
        width: 330,
        height: 450,
        alignSelf: 'center',
    },
    ratingText: {
        marginLeft: 5,
        color: 'white',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
    },
    subtitle: {
        color: 'grey',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    description: {
        color: 'white',
        margin: 20,
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default MovieDetailsScreen;
