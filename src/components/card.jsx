import React from "react";

export default ({ album }) => {
  return (
    <div class='card'>
      <div class='container'>
        <div class='top'>
          <img src={album.artwork} alt='artwork' />
        </div>
        <div class='bottom'>
          <div class='details'>
            <h4>{album.name}</h4>
            <p>{album.artist}</p>
            <p>{album.genre}</p>
            <p>{`${album.tracks} tracks`}</p>
          </div>
          <div class='favorite'>
            <button>Fav</button>
          </div>
        </div>
      </div>
    </div>
  );
};
