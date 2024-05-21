import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Carousel from 'components/UI/Carousel/Carousel';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

    const imageArray = [
        'images/slideshow/1-movies-in-park-1024x683.webp',
        'images/slideshow/movie-on-roof-cups.webp',
        'images/slideshow/cinema-audience.webp',

    ];
    const headerArray = ['Welcome to CineMagic!', 'Looking for movie?', 'Rate movies and share your experience'];
    const textArray = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui sodales, faucibus libero ut, posuere mauris.', 'Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui sodales, faucibus libero ut, posuere mauris.'];
    return (
        <>

            <Carousel images={imageArray} headers={headerArray} texts={textArray} />
            <div className="container mt-4">

                <section className="row align-items-center my-5">
                    <div className="col-md-6">
                        <div className="text-block text-block-1 p-3">
                            <h2>Welcome to CineMagic!</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui sodales, faucibus libero ut, posuere mauris.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src="images/slideshow/1-movies-in-park-1024x683.webp" className="img-fluid" alt="Responsive Image" />
                    </div>
                </section>

                <section className="row align-items-center my-5">
                    <div className="col-md-6 order-md-2">
                        <div className="text-block text-block-2 p-3">
                            <h2>Looking for movie?</h2>
                            <p>Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue.</p>
                        </div>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <img src="images/slideshow/movie-on-roof-cups.webp" className="img-fluid" alt="Responsive Image" />
                    </div>
                </section>

                <section className="row align-items-center my-5">
                    <div className="col-md-6">
                        <div className="text-block text-block-3 p-3">
                            <h2>Rate movies and share your experience</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non dui sodales, faucibus libero ut, posuere mauris.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src="images/slideshow/cinema-audience.webp" className="img-fluid" alt="Responsive Image" />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
