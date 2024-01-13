import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDelete from 'Hooks/useDelete';
import useFetch from 'Hooks/useFetch';
import useIsAuthorized from 'Hooks/useIsAuthorized';
import SessionContext from 'Providers/SessionProvider';
import ConfirmationModal from 'components/Modals/ConfirmationModal';
import AddComment from 'components/Movies/AddComment';
import Comments from 'components/Movies/Comments';
import MovieRating from 'components/Movies/MovieRating';
import Myspinner from 'components/Spinners/Myspinner';
import StarRating from 'components/UI/Rating/StarRating';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function MovieDetails() {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  let { id: movieId } = useParams();
  const { userId } = useContext(SessionContext);
  const isAdmin = useIsAuthorized(['Admin']);


  const { data: movie, isLoading, error } = useFetch(`/Movie/${movieId}`);

  const navigate = useNavigate();
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sendDeleteRequest, isPending, error: deleteError } = useDelete();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    sendDeleteRequest(`/Movie/${movieId}`).then((res) => {
      navigate(`/movies`);
    });
  };




  if (isLoading) return <Myspinner />;
  if (error) return <p>Error loading movie details</p>;
  if (isPending) return <Myspinner />;
  if (deleteError) return <p>Error deleting movie</p>;
  return (
    <>
      <div className="container mt-4">
        <h1>{movie.title}</h1>
        <div className="row">
          <div className="col-md-5">
            <AdvancedImage cldImg={myImage} className="img-fluid" />
          </div>
          <div className="col-md-7">
            <h2>{movie.title}</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p>{movie.description}</p>

            <MovieRating movieId={movieId} userId={userId} />

            {isAdmin && (<div >
              <Link to={`/movie/edit/${movieId}`}>
                <button className="btn btn-outline-success me-3">Edit Movie Details</button>
              </Link>
              <button className="btn btn-outline-danger" onClick={() => setIsModalOpen(true)}>Delete</button>
              {isModalOpen && (
                <ConfirmationModal
                  title={`Delete ${movie.title}`}
                  text="Are you sure you want to delete this movie?"
                  onCancel={handleCancel}
                  onConfirm={handleConfirm}
                />
              )}

            </div>

            )}
          </div>
        </div>
      </div >
      <div className="container-fluid p-5">

        <Comments movieId={movieId} />
      </div>
    </>
  );
}

export default MovieDetails;
