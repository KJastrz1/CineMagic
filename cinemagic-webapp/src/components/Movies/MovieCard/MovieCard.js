import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  const cld = new Cloudinary({ cloud: { cloudName: cloudName } });

  let myImage;
  let publicId;
  if (movie && movie.imageUrl) {
    const parts = movie.imageUrl.split('/');
    publicId = parts.slice(7).join('/');
  } else {
    publicId = 'placeholder'
  }
  myImage = cld.image(publicId);
  myImage.resize(fill().aspectRatio('9:12').height(400));
  myImage.format('auto');



  return (
    <div className="col mb-4 d-flex justify-content-center movie-card ">
      <Link to={`/movie/${movie.id}`} className='btn '>
        <div className=''>
          <AdvancedImage
            cldImg={myImage}
            className="img-fluid card-img-top"
            alt={movie.title}
            loading="lazy"
          />
          <div className='d-flex align-items-left ms-2 mt-2'>
            <span className='text ms-1'>
              <FontAwesomeIcon icon={faStar} style={{ color: "#f2d307", marginRight: "5px" }} />
              {movie.rating} ({movie.numberOfRatings})
            </span>
          </div>
          <div className='text-center w-100' >
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">dir. {movie.director}</p>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
