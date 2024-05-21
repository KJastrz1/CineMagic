import { Cloudinary } from '@cloudinary/url-gen';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import React, { useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';
import MovieCard from '../components/Movies/MovieCard/MovieCard';
import Myspinner from '../components/Spinners/Myspinner';
import PageButtons from 'components/Pagination/PageButtons';
import Search from 'components/UI/Search/Search';


function Movies() {


  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [text, setText] = useState('');
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const searchTextParam = text ? `/${text}` : '';
    
    setUrl(`/Movie/search${searchTextParam}/${page}/${pageSize}`);

    const newURL = `${window.location.pathname}?page=${page}${text ? `&searchText=${text}` : ''}`;

    window.history.pushState({ path: newURL }, '', newURL);
  }, [text, pageSize, page]);

  const handlePopState = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    const text = searchParams.get('searchText') || '';
    setPage(page);
    setText(text);
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const { data, isLoading, error, totalPages, totalItems } = useFetch(url);

  const handlePageChange = (newPage) => {
    setPage(newPage);

  };

  const handleSearch = (text) => {
    setPage(1);
    setText(text);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading && <Myspinner />}
      {!isLoading && data && (
        <div className="container-fluid p-4">
          <Search onSubmit={handleSearch} text={text} />
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {data.map((movie) => (

              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>


          <div className="d-flex justify-content-center">
            <PageButtons totalPages={totalPages} onPageChange={handlePageChange} currentPage={page} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
