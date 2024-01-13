import React, { useState, useEffect } from "react";

const Search = ({ onSubmit, text }) => {
    const [localText, setLocalText] = useState(text);
  
    useEffect(() => {
        setLocalText(text);
    }, [text]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(localText);
    }

    return (
        <form className="d-flex mx-3 mb-3" onSubmit={handleSubmit}>
            <div className="col-10 col-md-5 col-lg-3 me-2">
                <input
                    className="form-control"
                    type="search"
                    aria-label="Search"
                    value={localText}
                    onChange={(event) => setLocalText(event.target.value)}
                />
            </div>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default Search;
