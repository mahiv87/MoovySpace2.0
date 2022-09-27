import React from 'react';

function Carousel(props) {
  const { item } = props;
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="item">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.image}`}
          alt="Movie Poster"
        />
        <div className="likedDescriptions">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p
            onClick={() =>
              openInNewTab(`https://www.youtube.com/watch?v=${item.trailer}`)
            }
            className="btn btn-primary"
          >
            Watch {item.title} Trailer
          </p>
        </div>
      </div>
    </div>
  );
}
export default Carousel;
