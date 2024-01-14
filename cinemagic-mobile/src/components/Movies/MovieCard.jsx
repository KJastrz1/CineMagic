import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { CLOUDINARY_CLOUD_NAME } from '@env';

const MovieCard = ({ movie }) => {
  const navigation = useNavigation();

  const cld = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME} });

  let publicId;

  if (movie && movie.imageUrl) {
    const parts = movie.imageUrl.split('/');
    publicId = parts.slice(7).join('/');
  } else {
    publicId = 'placeholder';
  }
  let myImage = cld.image(publicId);
  myImage.resize(fill().aspectRatio('9:12').height(300).gravity(autoGravity()));
  myImage.format('auto');




  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', { movieId: movie.id })}>
        <AdvancedImage cldImg={myImage} style={{ width: 250, height: 300 }} />
        <View style={styles.ratingContainer}>
          <FontAwesomeIcon icon={faStar} size={15} color="#f2d307" />
          <Text style={styles.ratingText}>{movie.rating} ({movie.numberOfRatings})</Text>
        </View>
        <View >
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>dir. {movie.director}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  subtitle: {
    color: 'grey',
    width: '100%',
    textAlign: 'center',
  },
});

export default MovieCard;
