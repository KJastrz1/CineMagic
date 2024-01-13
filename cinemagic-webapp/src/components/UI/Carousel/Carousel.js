import React from 'react';
import './Carousel.css';

const Carousel = ({ images, headers, texts }) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : ''}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        data-bs-interval="2000"
                    >
                        <div className="d-flex">
                            {/* Image Section */}
                            <img src={img} className="d-block w-100" alt={`Slide ${index}`} />
                            {/* Caption Section */}
                            <div className="carousel-caption d-none d-md-block">
                                <h2>{headers[index]}</h2>
                                <p>{texts[index]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
