import React from "react";

export default ({
  album,
  clickHandler,
  disableFav = false,
  removeFav = false,
}) => {
  return (
    <div className='card'>
      <div className='container'>
        <div className='top'>
          <img src={album.artwork} alt='artwork' />
        </div>
        <div className='bottom'>
          <div className='details'>
            <h4>{album.name}</h4>
            <p>{album.artist}</p>
            <p>{album.genre}</p>
            <p>{`${album.tracks} Tracks`}</p>
          </div>
          <div className='favorite'>
            <button
              onClick={() => clickHandler(album)}
              disabled={!removeFav && disableFav}
            >
              {removeFav ? "Remove" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
